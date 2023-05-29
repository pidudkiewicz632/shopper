import fs from "fs";

export const saveFile = async (file, folder) => {
    const data = fs.readFileSync(file.filepath);
    const dir = `./public/products/${folder}/`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = dir + file.originalFilename;
    fs.writeFileSync(filePath, data);
    await fs.unlinkSync(file.filepath);
    return filePath;
};