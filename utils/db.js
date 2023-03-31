import mongoose from "mongoose";
const connection = {};
async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connection[0].readyState;

    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  //TODO need to bring in dotenv and fix the MONGO URI
  //   console.log(MONGODB_URI);
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to db");
  connection.isConnected = db.connection[0].readyState;
}

async function disconnect() {
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
