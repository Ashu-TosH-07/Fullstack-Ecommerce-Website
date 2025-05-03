const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    villageLocalArea: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    alternativeAddress: {
      type: String,
      default: "None",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
