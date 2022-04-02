import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.DB_CONNECTION;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.DB_CONNECTION) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  //   @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri ?? "", {});
    //   @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //   @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri ?? "", {});
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { clientPromise };

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.DB_CONNECTION ?? "", opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default dbConnect;
