// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI;

// if (!uri) {
//     console.error("Ошибка: строка подключения MONGO_URI не найдена!");
//   } else {
//     console.log("Строка подключения:", uri);
//   }

// //* Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDB() {
//     try {
//       console.log("Строка подключения:", uri);
//       if (!uri.startsWith("mongodb+srv://")) {
//         throw new Error("Ошибка: строка подключения MongoDB неверного формата!");
//       }
  
//       await client.connect();
//       console.log("✅ Успешно подключились к MongoDB!");
  
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (error) {
//       console.error("❌ Ошибка подключения:", error);
//     }
//   }

// module.exports = connectDB;
// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI;

// //* Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDB() {
//   try {
//     //* Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     //* Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.error('Ошибка подключения к базе данных:', error);
//   } finally {
//     //* Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = connectDB;

const mongoose = require('mongoose');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Создаем клиента MongoClient с опциями для API
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Подключаем клиента к серверу MongoDB
    await client.connect();
    // Отправляем команду ping для проверки соединения
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
}

// Не закрываем соединение с базой данных, чтобы оно оставалось открытым
module.exports = connectDB;
