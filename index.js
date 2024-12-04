require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upkox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    await client.connect();

    app.get('/reviews', async(req,res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })

    app.post('/reviews', async(req,res) => {
        const review = req.body;
        const result = await reviewCollection.insertOne(review)
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
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