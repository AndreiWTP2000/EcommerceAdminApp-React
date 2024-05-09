const PORT = 8000;
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

//Get Admins Test
app.get("/admins", async (req, res) => {
  try {
    const admins = await pool.query("SELECT * FROM admins");
    res.json(admins.rows);
  } catch (err) {
    console.error(err);
  }
});

//Get Products
app.get("/products", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (err) {
    console.error(err);
  }
});

// Get Product By Id
app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//Add New Product
app.post("/products", async (req, res) => {
  try {
    //const id = uuidv4();
    const { name, description, category, condition, price, photo } = req.body;
    await pool.query(
      `INSERT INTO products ( name, description, category, condition, price, photo) VALUES ( $1,$2, $3, $4, $5, $6)`,
      [name, description, category, condition, price, photo]
    );
  } catch (err) {
    console.error(err);
  }
});

//Update Product
app.post("/product/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, category, condition, price, photo } = req.body;
  try {
    await pool.query(
      "UPDATE products SET name = $1, description=$2, category = $3, condition=$4, price= $5 WHERE id = $6",
      [name, description, category, condition, price, id]
    );
  } catch (err) {
    console.error(err);
  }
});

//Delete Product
app.delete("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
  } catch (err) {
    console.error(err);
  }
});

//Get Orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.json(orders.rows);
  } catch (err) {
    console.error(err);
  }
});

//Get Order By Id
app.get("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    res.json(order.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//Add Order
app.post("/orders", async (req, resp) => {
  try {
    const { order_detail, address, order_value } = req.body;
    const currentDate = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    await pool.query(
      "INSERT INTO orders (order_detail, address, status, order_date, order_value) VALUES ($1, $2, 1, $3, $4)",
      [order_detail, address, formattedDate, order_value]
    );
  } catch (err) {
    console.log(err);
  }
});

//Delete Order
app.delete("/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM orders WHERE id=$1", [id]);
  } catch (err) {
    console.log(err);
  }
});

//LogIn
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
  try {
    const admins = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    if (!admins.rows.length)
      return res.json({ detail: "Admin dose not exist!" });

    if (password === admins.rows[0].hashed_password) {
      res.json({ email: admins.rows[0].email, token });
    } else {
      res.json({ detail: "Log In failed!" });
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
