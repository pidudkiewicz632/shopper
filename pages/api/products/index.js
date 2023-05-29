import formidable from "formidable";
import fs from "fs";
import dbConnect from "@/utils/dbConnection";
import Product from "@/models/Product";

const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
  };

  const handler = async (req, res) => {
    const {
        method,
        body,
    } = req;

    await dbConnect();
    console.log(req.body);

    if (method === "POST") {
        /*try {
            const product = await Product.create(req.body);

            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }*/
    }

    if (method === "GET") {
        try {
            const products = await Product.find();

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;