import { resetPasswordController } from "../../controllers/auth.controller";

export const handler = async (event: any) => {
  return resetPasswordController(event);
};
