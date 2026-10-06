import User from "../user/user.model.js";
import Product from "../product/product.model.js";
import Order from "../order/order.model.js";
import ProductVariant from "../productvariant/productvariant.model.js";

// Dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalCustomers,
      totalProducts,
      totalOrders,
      lowStockItems,
      salesData,
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),

      Product.countDocuments(),

      Order.countDocuments(),

    ProductVariant.countDocuments({
     stock: {
      $lte: 5,
        },
      }),

      Order.aggregate([
        {
          $match: {
            status: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    const totalSales =
      salesData.length > 0
        ? salesData[0].totalSales
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalProducts,
        totalOrders,
        totalSales,
        lowStockItems,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};


// Get Customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find(
      { role: "customer" },
      "-password"
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get customers",
      error: error.message,
    });
  }
};


// Get All Orders - Admin
export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .populate({
        path: "items.productVariant",
        populate: {
          path: "product",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Get admin orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};


// Update Order Status - Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};