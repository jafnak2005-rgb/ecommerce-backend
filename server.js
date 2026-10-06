import dotenv from "dotenv";

dotenv.config();

import express from "express";
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
import inventoryRouter from "./src/inventory/inventory.routes.js";
import adminRouter from "./src/admin/admin.routes.js";

console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);

const app = express();

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
app.use("/inventory", inventoryRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Ecommerce backend is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();