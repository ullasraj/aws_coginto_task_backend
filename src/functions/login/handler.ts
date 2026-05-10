import { loginController } from "../../controllers/auth.controller";

export const handler = async (event: any) => {
  return loginController(event);
};
