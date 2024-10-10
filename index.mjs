import express from "express";
import { engine, create } from "express-handlebars";

const app = express();

const hbs = create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", engine(hbs));
app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
  {
    name: "Desktop",
    category: "Electronics",
    description: "All-in-one computer for your daily tasks.",
    value: 2500,
  },
  {
    name: "Laptop",
    category: "Electronics",
    description: "Good quality hardware for home and work.",
    value: 2000,
  },
  {
    name: "Bag",
    category: "Wear",
    description: "Simple bag for school or university.",
    value: 150,
  },
];

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.get("/products/:product", (req, res) => {
  const productName = req.params.product;
  const product = products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );
  if (product) {
    res.render("productDetails", { product });
  } else {
    res.status(404).send("Product not found!");
  }
});

app.listen(3000, () => {
  console.log("App executando!");
});
