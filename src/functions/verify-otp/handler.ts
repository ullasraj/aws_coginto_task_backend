import { verifyOtpController } from "../../controllers/auth.controller";

export const handler = async (event: any) => {
  return verifyOtpController(event);
};
