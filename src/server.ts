import { App } from "./app";
import { ConnectMongo } from "./config/dbConnection";


const app = new App();
const database = new ConnectMongo();


database.connectDB();

app
  .getApp()
  .listen(process.env.PORT, () =>
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`)
  );
