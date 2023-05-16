const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db("library").collection("books").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("library")
    .collection("books")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createOne = async (req, res) => {
  const newBook = 
  {
    title: req.body.title,
    format: req.body.format,
    publication: req.body.publication,
    pages: req.body.pages,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description
  }
  const response = await mongodb
    .getDb()
    .db("library")
    .collection("books")
    .insertOne(newBook)
  if (response.acknowledged){
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error);
  }
};

const updateOne = async (req, res) => {
  const newInfo = 
  {
    title: req.body.title,
    format: req.body.format,
    publication: req.body.publication,
    pages: req.body.pages,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("library")
    .collection("books")
    .replaceOne({ _id: userId }, newInfo);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Unable to update Book.');
    }
  }
  const deleteOne = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("library")
      .collection("books")
      .deleteOne( { "_id" : userId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete Book.');
      }
  };
  
module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
