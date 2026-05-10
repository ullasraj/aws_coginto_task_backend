import { AppDataSource } from "./datasource";

let initialized = false;

export const initializeDatabase = async () => {
  if (!initialized) {
    await AppDataSource.initialize();

    console.log("Database Connected");

    initialized = true;
  }

  return AppDataSource;
};
