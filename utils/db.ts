import mongoose, { Mongoose } from "mongoose";

interface IDoc {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

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

//! In this updated version, we create a shallow copy of the original doc object as newObj. Then, we modify the properties of newObj and return it.
function convertDocToObj(doc: IDoc): IDoc {
  const newObj: any = { ...doc }; // Create a shallow copy of the original object
  newObj._id = newObj._id.toString();
  newObj.createdAt = newObj.createdAt.toString();
  newObj.updatedAt = newObj.updatedAt.toString();
  return newObj;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
