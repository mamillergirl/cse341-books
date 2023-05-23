const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db("library").collection("authors").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("library")
    .collection("authors")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createOne = async (req, res) => {
  
  const newAuthor = 
  {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    deathDate: req.body.deathDate,
    bio: req.body.bio
  }
  const response = await mongodb
    .getDb()
    .db("library")
    .collection("authors")
    .insertOne(newAuthor)
  if (response.acknowledged){
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error);
  }
};

const updateOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const newInfo = 
  {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    deathDate: req.body.deathDate,
    bio: req.body.bio
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("library")
    .collection("authors")
    .replaceOne({ _id: userId }, newInfo);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Unable to update Author.');
    }
  }
  const deleteOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("library")
      .collection("authors")
      .deleteOne( { "_id" : userId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete Author.');
      }
  };
  
module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
