const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvgc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("placeOrder");
      const ordersCollection = database.collection("orders");
      const orderCollection = database.collection("order");
      // create a document to insert

    // ORDERS  GET API 
    app.get('/orders' , async(req , res)=>{
        const cursor = ordersCollection.find({})
        const result = await cursor.toArray()
       res.send(result)
    
    })
    // ORDERS POST API 
    app.post('/orders' , async(req , res)=>{
        const orders = req.body
        const result = await ordersCollection.insertOne(orders)
        res.json(result)
    
    })

    // ORDER GET API 
    app.get('/order' , async(req , res)=>{
        const cursor = orderCollection.find({})
        const result = await cursor.toArray()
       res.send(result)
    
    })

    //  POST API 
    app.post('/order' , async(req , res)=>{
        const order = req.body
        const result = await orderCollection.insertOne(order)
        res.json(result)
    
    })

    // // DELETE API 
    app.delete('/orders/:id', async(req, res) => {
        const id = req.params.id
        const query = {_id: ObjectId(id)}
        const result = await ordersCollection.deleteOne(query)
        res.send(result);
    });


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))