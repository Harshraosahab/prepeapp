import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Ensure database name is included in MONGO_URI
    let mongoUri = process.env.MONGO_URI;
    if (!mongoUri.includes('/') || mongoUri.endsWith('/')) {
      // Add database name if missing
      const dbName = 'mernfullproject';
      if (mongoUri.endsWith('/')) {
        mongoUri = mongoUri + dbName;
      } else if (!mongoUri.includes('?')) {
        mongoUri = mongoUri + '/' + dbName;
      }
    }
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
