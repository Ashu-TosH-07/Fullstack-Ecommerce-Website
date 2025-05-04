const mongooese = require("mongoose");
const CartSchema = new mongooese.Schema(
  {
    userId: {
      type: mongooese.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongooese.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongooese.model("Cart", CartSchema);
