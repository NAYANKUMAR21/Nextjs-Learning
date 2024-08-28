require('dotenv').config();
import mongoose from 'mongoose';

const connect = async () => {
  return mongoose.connect(process.env.MONGO_URI!);
};

export default connect;
