const mongoose=require('mongoose');




const PORT = process.env.PORT || 4000

const connection = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/chearful');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports=connection;


