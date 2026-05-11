import { SignUpCommand, ConfirmSignUpCommand, InitiateAuthCommand, ForgotPasswordCommand, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

import { cognitoClient, CLIENT_ID } from "../config/cognito";
import { initializeDatabase } from "../config/database";
import { ResendOtpTracking } from "../entities/resend-otp.entity";
export const authService = {
  async signup(data: any) {
    const { name, email, password } = data;

    try {
      const db = await initializeDatabase();

      const repository = db.getRepository(ResendOtpTracking);
      const newUser = repository.create({
        email,
        resend_count: 1,
        last_resend_at: new Date(),
      });

      await repository.save(newUser);
      await cognitoClient.send(
        new SignUpCommand({
          ClientId: CLIENT_ID,
          Username: email,
          Password: password,
          UserAttributes: [
            {
              Name: "name",
              Value: name,
            },
            {
              Name: "email",
              Value: email,
            },
          ],
        }),
      );

      return {
        message: "OTP sent successfully",
      };
    } catch (error: any) {
      if (error.name === "UsernameExistsException") {
        throw new Error("User already exists");
      }

      if (error.name === "InvalidPasswordException") {
        throw new Error("Password must contain uppercase, lowercase, number and special character");
      }

      throw new Error("Something went wrong");
    }
  },

  async verifyOtp(data: any) {
    const { email, otp } = data;
    const db = await initializeDatabase();

    const repository = db.getRepository(ResendOtpTracking);

    const user = await repository.findOne({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.last_resend_at) {
      throw new Error("OTP not generated");
    }

    const otpCreatedAt = new Date(user.last_resend_at).getTime();

    const now = Date.now();

    const diffInMinutes = (now - otpCreatedAt) / (1000 * 60);

    if (diffInMinutes > 5) {
      throw new Error("OTP expired");
    }
    await cognitoClient.send(
      new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,

        Username: email,

        ConfirmationCode: otp,
      }),
    );

    return {
      message: "OTP verified successfully",
    };
  },

  async login(data: any) {
    const { email, password } = data;
    const response = await cognitoClient.send(
      new InitiateAuthCommand({
        ClientId: CLIENT_ID,

        AuthFlow: "USER_PASSWORD_AUTH",

        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      }),
    );

    return response.AuthenticationResult;
  },

  async forgotPassword(data: any) {
    const { email } = data;
    await cognitoClient.send(
      new ForgotPasswordCommand({
        ClientId: CLIENT_ID,

        Username: email,
      }),
    );

    return {
      message: "Password reset OTP sent",
    };
  },

  async resetPassword(data: any) {
    const { email, otp, newPassword } = data;
    await cognitoClient.send(
      new ConfirmForgotPasswordCommand({
        ClientId: CLIENT_ID,

        Username: email,

        ConfirmationCode: otp,

        Password: newPassword,
      }),
    );

    return {
      message: "Password reset successful",
    };
  },
};
