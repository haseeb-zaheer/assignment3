require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // ⬅️ Debug



const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('AP-A3'); 

    const filePath = path.join(__dirname, '../data/data.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(rawData);

    await db.collection('movies').deleteMany({});
    await db.collection('genres').deleteMany({});
    await db.collection('directors').deleteMany({});

    await db.collection('movies').insertMany(json.movies);
    await db.collection('genres').insertMany(json.genres);
    await db.collection('directors').insertMany(json.directors);

    console.log('✅ Data imported successfully to MongoDB Atlas.');
  } catch (error) {
    console.error('❌ Error importing data:', error);
  } finally {
    await client.close();
  }
}

run();
