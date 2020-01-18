const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'test';
const client = new MongoClient(url);

let db, actors;

client.connect((error) => {
    if (error) {
        console.error('Could not connect to the MongoDB server. ')
    } else {
        console.log('Connected successfully to the MongoDB server.');
        db = client.db(dbName);
        actors = db.collection('actors');
    }
});

const findActors = function (callback) {
    actors.find({}).toArray(function (err, actors) {
        callback(actors);
    });
};

const findActorById = function (id, callback) {
    actors.findOne({_id: ObjectID.createFromHexString(id)}, function (err, actor) {
        callback(actor);
    });
};

const saveActor = function(id, name, character) {
    actors.update({_id: ObjectID.createFromHexString(id)}, {name, character});
};

module.exports = {findActors, findActorById, saveActor};