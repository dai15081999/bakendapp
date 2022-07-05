import mongoose from "mongoose";
import { DB_URL } from "../config/env";

class Databse {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("Connected to db");
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export default new Databse()