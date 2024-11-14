const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017"; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("carDatabase"); 
    const cars = db.collection("cars");

    await cars.insertMany([
      { brand: "BMW", price: 20000, model: "X5", year: 2015, horsepower: 300 },
      { brand: "Audi", price: 18000, model: "A4", year: 2016, horsepower: 220 },
      { brand: "Mercedes", price: 25000, model: "C-Class", year: 2015, horsepower: 270 },
      { brand: "BMW", price: 22000, model: "X3", year: 2018, horsepower: 280 },
      { brand: "Toyota", price: 15000, model: "Camry", year: 2015, horsepower: 200 },
      { brand: "Honda", price: 14000, model: "Civic", year: 2018, horsepower: 160 },
      { brand: "Audi", price: 21000, model: "Q5", year: 2017, horsepower: 250 },
      { brand: "BMW", price: 30000, model: "X6", year: 2017, horsepower: 350 },
      { brand: "Ford", price: 12000, model: "Focus", year: 2016, horsepower: 180 },
      { brand: "Toyota", price: 16000, model: "Corolla", year: 2018, horsepower: 150 }
    ]);

    const avgPriceByBrand = await cars.aggregate([
      { $group: { _id: "$brand", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Средняя цена по брендам:", avgPriceByBrand);

    const avgPriceByYear = await cars.aggregate([
      { $group: { _id: "$year", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Средняя цена по годам:", avgPriceByYear);

    const maxHorsepowerByBrand = await cars.aggregate([
      { $group: { _id: "$brand", maxHorsepower: { $max: "$horsepower" } } }
    ]).toArray();
    console.log("Максимальная мощность по брендам:", maxHorsepowerByBrand);

    const threeCheapestCars = await cars.find().sort({ price: 1 }).limit(3).toArray();
    console.log("Три самые дешевые машины:", threeCheapestCars);

    const threeMostExpensiveBMW = await cars.find({ brand: "BMW" }).sort({ price: -1 }).limit(3).toArray();
    console.log("Три самые дорогие машины бренда BMW:", threeMostExpensiveBMW);

    const randomBMW = await cars.aggregate([
      { $match: { brand: "BMW" } },
      { $sample: { size: 1 } }
    ]).toArray();
    console.log("Случайный автомобиль марки BMW:", randomBMW);

  } finally {
    await client.close();
  }
}

main().catch(console.error);
