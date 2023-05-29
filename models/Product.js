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
    images: {
      type: [String],
      required: false,
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
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
