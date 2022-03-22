const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient
const MONGODB_URI =
  "mongodb+srv://yellow:125512@cs5610.kgnh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
require('dotenv').config()
const uri = process.env.authURI||MONGODB_URI

const client = new MongoClient(uri)





module.exports = {
  //connect 
  dbConnect: async function dbConnect() {
    try {
      await client.connect()
      console.log("db connected")
    } catch (err) {
      console.log(err)
    }
  },

  //create a new user
  saveUser: async function saveUser(user) {
    try {
      await client.db("cs5610").collection("users").insertOne(user);
    } catch (err) {
      console.log(err)
    }
  },

  //article-add
  saveArticle: async function saveArticle(article) {
    try {
      await client.db("cs5610").collection("articles").insertOne(article);
    } catch (err) {
      console.log(err)
    }
  },

  //check if user exist
  findUser: async function findUser(user) {
    try {
      const data = await client.db("cs5610").collection("users").findOne(user);
      return data
    } catch (err) {
      console.log(err)
    }
  },

  // find the target article by title
  // and show its details on the page
  findArticle: async function findArticle(id) {
    try {
      const mergeCollection = client.db("cs5610").collection("articles").aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "fromUsers"
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromUsers", 0] }, "$$ROOT"] } }
        },

        {
          $project: { fromUsers: 0 }
        },
        { $match: { title: id } },
      ])

      const cursor = mergeCollection.limit(1).toArray()
      //  console.log(cursor)
      return cursor
    } catch (err) {
      console.log(err)
    }
  },

  //delete article by title
  deleteArticle: async function deleteArticle(title) {
    try {
      client.db("cs5610").collection("articles").findOneAndDelete({ title: title })
    } catch (err) {
      console.log(err)
    }
  },

  //find all articles and merge with the info of author
  //show all articles on the default page, 4 result per page.
  //sort by pubdate
  findAllArticles: async function findAllArticles(start, pagesize) {
    try {
      const mergeCollection = client.db("cs5610").collection("articles").aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "fromUsers"
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromUsers", 0] }, "$$ROOT"] } }
        },

        {
          $project: { fromUsers: 0 }
        }

      ])
      const cursor = mergeCollection.sort({ pubdate: 1 }).skip(start).limit(parseInt(pagesize)).toArray()
      return cursor
    } catch (err) {
      console.log(err)
    }
  },

  //count the number of all articles
  countAllArticle: async function countArticle() {
    try {
      const data = await client.db("cs5610").collection("articles").countDocuments({});
      //  console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  },

  //By author count the number of articles 
  countArticle: async function countArticle(id) {
    try {
      const data = await client.db("cs5610").collection("articles").countDocuments({ author: id });
      //console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  },

  //By author 
  //find all articles and merge with the info of author
  //show list articles on the profile page, 5 result per page.
  //sort by pubdate
  findArticles: async function findArticles(name, start, pagesize) {
    try {
      const mergeCollection = client.db("cs5610").collection("articles").aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "fromUsers"
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromUsers", 0] }, "$$ROOT"] } }
        },

        {
          $project: { fromUsers: 0 }
        },
        { $match: { name: name } },

      ])
      const cursor = mergeCollection.sort({ pubdate: 1 }).skip(start).limit(parseInt(pagesize)).toArray()
      return cursor
    } catch (err) {
      console.log(err)
    }
  },

  update: async function update(title, data) {
    try {
      const update = {
        $set: {

          title: data.title,
          tags: data.tags,
          autho: data.author,
          cover: data.cover,
          content: data.content,
          pubdate: data.pubdate,

        }
      }
      client.db("cs5610").collection("articles").findOneAndUpdate({ title: title }, update, {
        upsert: false, returnOriginal: false, returnNewDocument: true
      })
    } catch (err) {
      console.log(err)
    }
  },

}