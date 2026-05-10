import { authService } from "../services/auth.service";

import { successResponse, errorResponse } from "../utils/response";
import { HTTP_STATUS } from "../utils/status_codes";

export const signupController = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    const result = await authService.signup(body);
    return successResponse(result, HTTP_STATUS.OK);
  } catch (error: any) {
    return errorResponse(error.message);
  }
};

export const verifyOtpController = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const result = await authService.verifyOtp(body);

    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.message);
  }
};

export const loginController = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    const result = await authService.login(body);
    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.message, HTTP_STATUS.UNAUTHORIZED);
  }
};

export const forgotPasswordController = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const result = await authService.forgotPassword(body);

    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.message);
  }
};

export const resetPasswordController = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const result = await authService.resetPassword(body);

    return successResponse(result);
  } catch (error: any) {
    return errorResponse(error.message);
  }
};
