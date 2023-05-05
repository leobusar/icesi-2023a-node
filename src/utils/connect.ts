import mongoose  from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug('app:connect');

async function connect() {

  const dbUri: string = process.env.MONGODB_URI || "mongodb://localhost:27017/test";     
  try{
    await mongoose.connect(dbUri);
    log('Connected to database!!!');

  }catch(error: any){
    log("Error connecting to database");
    log(error);
    process.exit(1);
  }

}

export default connect;