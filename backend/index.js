const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Stripe = require("stripe");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 5555;

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database connection error:", err));

// User Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// API Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Sign Up
const bcrypt = require("bcrypt");

// Sign Up
app.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, image } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({ message: "Email is already registered", alert: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      image,
    });
    await newUser.save();

    res.send({ message: "Successfully signed up", alert: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Sign-up failed", alert: false });
  }
});


// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ message: "Email not found, please sign up", alert: false });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send({ message: "Invalid password", alert: false });
    }

    // Send user data if login is successful
    const dataToSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };

    res.send({ message: "Login successful", alert: true, data: dataToSend });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Login failed", alert: false });
  }
});


// Product Schema
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

// Save Product API
app.post("/uploadProduct", async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.send({ message: "Product uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to upload product" });
  }
});

// Get Products API
app.get("/product", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch products" });
  }
});

// Stripe Payment Gateway
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      // Remove this if you're not using shipping options
      // shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],
      line_items: req.body.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // price in paise
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(params);

    // Respond with the session ID
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});


// Server Start
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));

//Email 

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Nodemailer Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your email
        pass: process.env.GMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: `Contact Form <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL, 
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Failed to send your message. Please try again later." });
  }
});