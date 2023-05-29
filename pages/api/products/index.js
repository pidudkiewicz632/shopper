import formidable from "formidable";
import dbConnect from "@/utils/dbConnection";
import Product from "@/models/Product";
import { saveFile } from "@/utils/file";

export const config = {
    api: {
        bodyParser: false
    }
};

const handler = async (req, res) => {
    const {
        method,
        body,
    } = req;

    await dbConnect();

    if (method === "POST") {
        try {
            const form = new formidable.IncomingForm();

            form.parse(req, async function (err, fields, files) {
                try {
                    let product = await Product.create(fields);

                    if (files) {
                        const filesPaths = [];

                        for (const key in files) {
                            const path = await saveFile(files[key], product.id);
                            filesPaths.push(path);
                        }

                        product = await Product.findOneAndUpdate({
                            _id: product.id
                        }, {
                            images: filesPaths
                        });
                    }

                    return res.status(200).json(product);
                } catch (err) {
                    console.log(err)
                    return res.status(500).json(err);
                }
            });
        } catch (err) {
            return res.status(500).json(err);
        }

    }

    if (method === "GET") {
        try {
            const products = await Product.find();

            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

export default handler;