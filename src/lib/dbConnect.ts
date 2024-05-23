import mongoose, { ConnectOptions } from 'mongoose';

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  console.log(connection);

  if (connection.isConnected === 1) {
    console.log('Already connected, no need to reconnect.');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    connection.isConnected = db.connections[0].readyState;

    console.log('MongoDB connected:', connection.isConnected);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export default dbConnect;
