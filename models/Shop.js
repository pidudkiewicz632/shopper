import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
      validate: {
        validator: function (v) {
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
    logo: {
      type: String,
      required: false,
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

export default mongoose.models.Shop ||
  mongoose.model("Shop", ShopSchema);