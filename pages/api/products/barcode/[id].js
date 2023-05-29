import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnection";

const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect();

    if (method === "GET") {
        try {
            const product = await Product.findOne({
                barcode: id
            });

            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;
