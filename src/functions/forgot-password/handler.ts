import { forgotPasswordController } from "../../controllers/auth.controller";

export const handler = async (event: any) => {
  return forgotPasswordController(event);
};
