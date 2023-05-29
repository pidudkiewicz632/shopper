import mongoose from "mongoose";

const ProductShopSchema = new mongoose.Schema(
    {
        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

ProductShopSchema.pre('save', function(next) {
    this.price = this.price.toFixed(2);
    next();
  });

export default mongoose.models.ProductShop ||
    mongoose.model("Product", ProductShopSchema);
