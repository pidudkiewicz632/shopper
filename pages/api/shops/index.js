import dbConnect from "@/utils/dbConnection";
import Shop from "@/models/Shop";

const handler = async (req, res) => {
    const {
        method,
    } = req;

    await dbConnect();

    if (method === "POST") {
        try {
            const shop = await Shop.create(req.body);

            res.status(200).json(shop);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "GET") {
        try {
            const shops = await Shop.find();

            res.status(200).json(shops);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;
