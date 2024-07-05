import mongoose from "mongoose";

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("connection successfull");
    })
    .catch((error) => {
      console.log("Error connecting to database: ", error.message);
    });
};

export default databaseConnection;
