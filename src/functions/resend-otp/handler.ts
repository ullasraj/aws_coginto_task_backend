import { resendOtpController } from "../../controllers/resend-otp.controller";

export const handler = async (event: any) => {
  return resendOtpController(event);
};
