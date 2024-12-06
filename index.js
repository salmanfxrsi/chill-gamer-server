require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upkox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const reviewCollection = client.db('reviewsDB').collection('reviews');

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    app.get('/reviews', async(req,res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })

    app.get('/reviews/:id', async(req,res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const cursor = await reviewCollection.findOne(query)
      res.send(cursor)
    })

    app.get('/my-reviews/:email', async(req,res) => {
      const email = req.params.email
      const query = { email: email }
      const result = await reviewCollection.find(query).toArray()
      res.send(result)
    })

    app.post('/reviews', async(req,res) => {
        const review = req.body;
        const result = await reviewCollection.insertOne(review)
        res.send(result)
    })

    app.patch('/reviews', async(req,res) => {
      const id = req.params.updateId;
      const boolean = req.body;
      const update = {
        $set: {
          isWatchLater: boolean
        }
      }
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const result = await reviewCollection.updateOne(query,update,options)
      res.send(result)
    })

    app.delete('/delete-reviews/:id', async(req,res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = reviewCollection.deleteOne(query)
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



// test
app.get('/', (req,res) => {
    res.send('Chill Gamer server is running!')
})

app.listen(port, () => {
    console.log(`Chill Gamer server is running in port ${port}`)
})