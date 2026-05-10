import { HTTP_STATUS } from "./status_codes";

export const successResponse = (data: any, statusCode = HTTP_STATUS.OK) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  body: JSON.stringify({
    success: true,
    data,
  }),
});

export const errorResponse = (message: string, statusCode = HTTP_STATUS.BAD_REQUEST) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  body: JSON.stringify({
    success: false,
    message,
  }),
});
