import { signupController } from "../../controllers/auth.controller";

export const handler = async (event: any) => {
  return signupController(event);
};
