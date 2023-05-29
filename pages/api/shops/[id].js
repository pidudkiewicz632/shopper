import Shop from "@/models/Shop";
import dbConnect from "@/utils/dbConnection";

const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect();

    if (method === "GET") {
        try {
            const shop = await Shop.findById(id);

            res.status(200).json(shop);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    if (method === "PATCH") {
        try {
            const shop = await Shop.findOneAndUpdate({
                _id: id
            }, req.body);

            res.status(200).json(shop);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    if (method === "DELETE") {
        try {
            await Shop.deleteOne({
                _id: id
            });

            res.status(200).json({
                'message': 'succes',
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

export default handler;
