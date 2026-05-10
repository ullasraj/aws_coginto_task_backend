import "reflect-metadata";
import { ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";

import { cognito } from "./cognito.service";

import { initializeDatabase } from "../config/database";

import { ResendOtpTracking } from "../entities/resend-otp.entity";

export const resendOtpService = {
  async resendOtp(email: string) {
    const db = await initializeDatabase();

    const repository = db.getRepository(ResendOtpTracking);
    const existing = await repository.findOne({
      where: {
        email,
      },
    });

    if (existing) {
      const diff = Date.now() - new Date(existing.last_resend_at).getTime();

      if (diff < 30000) {
        throw new Error("Please wait 30 seconds");
      }
      if (existing.resend_count >= 3) {
        throw new Error("Maximum resend attempts exceeded");
      }

      existing.resend_count += 1;

      existing.last_resend_at = new Date();

      await repository.save(existing);
    } else {
      const newUser = repository.create({
        email,
        resend_count: 1,
        last_resend_at: new Date(),
      });

      await repository.save(newUser);
    }

    await cognito.send(
      new ResendConfirmationCodeCommand({
        ClientId: process.env.COGNITO_CLIENT_ID!,

        Username: email,
      }),
    );

    return {
      message: "OTP resent successfully",
    };
  },
};
