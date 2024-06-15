const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');  // Ensure this file exists
const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

// GET all products
app.get('/product', async (req, res) => {
  try {
    const products = await Product.find({});  // Fetch all products
    res.status(200).json(products);  // Respond with fetched products
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle errors
  }
});

// GET a product by ID
app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });  // Handle product not found
    }
    res.status(200).json(product);  // Respond with the found product
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });  // Handle errors
  }
});

// CREATE a new product
app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);  // Create a new product
    res.status(201).json(product);  // Respond with the created product
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });  // Handle errors
  }
});

// UPDATE a product by ID
app.put('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // Return the updated document and run validators
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });  // Handle product not found
    }
    res.status(200).json(product);  // Respond with the updated product
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle errors
  }
});

// DELETE a product by ID
app.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);  // Delete product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });  // Handle product not found
    }
    res.status(200).json({ message: 'Product deleted successfully' });  // Respond with success message
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle errors
  }
});

mongoose.set("strictQuery", false);  // Set mongoose to use strict query mode
mongoose.connect('mongodb+srv://root:118418@cluster0.qgnzgzo.mongodb.net/CRUD-API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');  // Log successful connection

    app.listen(3000, () => {
      console.log('Node API app is running on port 3000');  // Log server start
    });
  })
  .catch((error) => {
    console.log(error);  // Log connection errors
  });
