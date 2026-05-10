import { HTTP_STATUS } from "./status_codes";

export const successResponse = (data: any, statusCode = HTTP_STATUS.OK) => ({
  statusCode,
  body: JSON.stringify({
    success: true,
    data,
  }),
});

export const errorResponse = (message: string, statusCode = HTTP_STATUS.BAD_REQUEST) => ({
  statusCode,
  body: JSON.stringify({
    success: false,
    message,
  }),
});
