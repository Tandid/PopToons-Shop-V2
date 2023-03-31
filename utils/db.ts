import mongoose, { Mongoose } from "mongoose";

interface Connection {
  isConnected: boolean;
}

const connection: Connection = {
  isConnected: false,
};

async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connection.readyState) {
    connection.isConnected = mongoose.connection.readyState === 1;

    if (connection.isConnected) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  const db: Mongoose = await mongoose.connect(
    process.env.MONGODB_URI as string
  );
  console.log("connected to db");
  connection.isConnected = db.connection.readyState === 1;
}

async function disconnect(): Promise<void> {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

const db = { connect, disconnect };
export default db;
