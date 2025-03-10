const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb+srv://FeedMe:feedme123@feedme.jzuhh.mongodb.net/feedme?retryWrites=true&w=majority&appName=Feedme' // Customer change url to your db you created in atlas

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(async function (err, catData) {
                    // callback(err, data, Catdata);
                    if (err) console.log(err)
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }

                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
