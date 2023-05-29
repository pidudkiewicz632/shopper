import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnection";
import { saveFile } from "@/utils/file";
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false
    }
};


const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect();

    if (method === "PATCH") {
        try {
            const form = new formidable.IncomingForm();

            form.parse(req, async function (err, fields, files) {
                try {
                    let product = await Product.findOneAndUpdate({
                        _id: id
                    }, fields);

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
            console.log(err);
            return res.status(500).json(err);
        }
    }
};

export default handler;
