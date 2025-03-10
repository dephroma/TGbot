require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rromann192:NhBswLUea4XHc3zH@cluster0.qdr3m.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

if (!uri) {
    console.error("Ошибка: строка подключения MONGO_URI не найдена!");
  } else {
    console.log("Строка подключения:", uri);
  }

//* Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    
  }
});

async function connectDB() {
    try {
      console.log("Строка подключения:", uri);
      if (!uri.startsWith("mongodb+srv://")) {
        throw new Error("Ошибка: строка подключения MongoDB неверного формата!");
      }
  
      await client.connect();
      console.log("✅ Успешно подключились к MongoDB!");
  
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("❌ Ошибка подключения:", error);
    }
  }

module.exports = connectDB;
