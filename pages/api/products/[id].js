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
            const product = await Product.findById(id);

            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    if (method === "PATCH") {
        try {
            const product = await Product.findOneAndUpdate({
                _id: id
            }, req.body);

            return res.status(200).json(product);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    if (method === "DELETE") {
        try {
            await Product.deleteOne({
                _id: id
            });

            return res.status(200).json({
                'message': 'succes',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};

export default handler;
