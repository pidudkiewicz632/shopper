import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
      validate: {
        validator: function (v) {
          console.log(";;;; " + v);
          return /^[a-zA-Z0-9 -]*$/.test(v);
        },
        message: (props) => "Illegal characters were used!" + a,
      },
    },
    desc: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9 .,-:]*$/.test(value);
        },
        message: "Illegal characters were used!",
      },
    },
    img: {
      type: String,
      required: true,
    },
    barcode: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{0,13}$/.test(value);
        },
        message: "Bad code!",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);