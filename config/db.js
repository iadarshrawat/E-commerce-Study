import mongoose from  'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log(`error in MONGO ${error}`)
    }
}

export default connectDB;