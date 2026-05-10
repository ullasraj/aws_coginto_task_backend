import { resendOtpService } from "../services/resend-otp.service";

import { successResponse, errorResponse } from "../utils/response";

export const resendOtpController = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    const result = await resendOtpService.resendOtp(body.email);

    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.message, 429);
  }
};
