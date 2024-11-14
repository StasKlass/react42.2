const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'drinkDatabase';

async function main() {
    await client.connect();
    console.log('Подключено к серверу MongoDB');
    
    const db = client.db(dbName);
    const drinks = db.collection('drink');

    await drinks.insertMany([
        { name: 'Whiskey', price: 20, strength: 40, volume: 500 },
        { name: 'Vodka', price: 15, strength: 37, volume: 500 },
        { name: 'Beer', price: 5, strength: 5, volume: 500 },
        { name: 'Wine', price: 12, strength: 12, volume: 750 },
        { name: 'Gin', price: 18, strength: 42, volume: 700 },
        { name: 'Rum', price: 22, strength: 38, volume: 750 }
    ]);

    const mostExpensive = await drinks.find().sort({ price: -1 }).limit(1).toArray();
    console.log('Самый дорогой напиток:', mostExpensive[0]);

    const threeCheapest = await drinks.find().sort({ price: 1 }).limit(3).toArray();
    console.log('Топ-3 самых дешевых напитка:', threeCheapest);

    const strongestDrink = await drinks.find().sort({ strength: -1 }).limit(1).toArray();
    console.log('Самый крепкий напиток:', strongestDrink[0].name);

    await client.close();
}

main().catch(console.error);
