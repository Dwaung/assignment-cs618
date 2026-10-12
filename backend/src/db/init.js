import mongoose from 'mongoose';

export async function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/blog';
  
  try {
    mongoose.connection.on('open', () => {
      console.log('Successfully connected to MongoDB');
    });
    await mongoose.connect(DATABASE_URL);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
}