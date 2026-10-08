import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./db.js";

import userRouter from "./src/user/user.routes.js";
import cartRouter from "./src/cart/cart.routes.js";
import categoryRouter from "./src/category/category.routes.js";
import customerRouter from "./src/customer/customer.routes.js";
import orderRouter from "./src/order/order.routes.js";
import paymentRouter from "./src/payment/payment.routes.js";
import productRouter from "./src/product/product.routes.js";
import productVariantRouter from "./src/productvariant/productvariant.routes.js";
import addressRouter from "./src/address/address.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.use("/customer", customerRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/product", productRouter);
app.use("/productvariant", productVariantRouter);
app.use("/address", addressRouter);

app.get("/", (req, res) => {
  res.send("Ecommerce backend is running");
});

const PORT = process.env.PORT || 5000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});