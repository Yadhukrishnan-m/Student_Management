import mongoose from "mongoose";

export class ConnectMongo {
  private databaseUrl: string;
  constructor() {
    if (!process.env.DB_URL) {
      throw new Error(
        " env string not found"
      );
    }
    this.databaseUrl = process.env.DB_URL;
  }
  connectDB() {
    mongoose
      .connect(this.databaseUrl)
      .then(() => console.log("database connected successfully."))
      .catch((err) => console.error(err));
  }
}
