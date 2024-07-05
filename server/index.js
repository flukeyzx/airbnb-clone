import databaseConnection from "./database/connection.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening on the port ${process.env.PORT}`);
});

databaseConnection();
