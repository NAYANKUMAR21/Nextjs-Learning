import mongoose from 'mongoose';

async function connect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, // 60 seconds
  };
  try {
    mongoose.connect(process.env.MONGO_URI!, options);
    const connection = mongoose.connection;

    connection.on('error', (error) => {
      console.log(error.message);
      process.exit();
    });

    connection.on('connected', () => {
      console.log('MongoDb connected successfully!..');
    });
  } catch (er: any) {
    console.log('Something happened in ', er.message);
  }
}

export default connect;
