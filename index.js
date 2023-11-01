const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = 'mongodb://localhost:27017';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-one.varjcyv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // await client.connect();
    const productCollection = client.db('emaJohnDB').collection('products');

    app.get('/products', async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    app.get('/productsCount', async (req, res) => {
      const count = await productCollection.estimatedDocumentCount();
      res.send({ count });
    });

    await client.db('admin').command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.dir(error);
  }
};
run();

app.get('/', (req, res) => {
  res.send('john is busy shopping');
});

app.listen(port, () => {
  console.log(`ema john server is running on port: http://localhost:${port}`);
});
