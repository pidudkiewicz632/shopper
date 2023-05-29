import EditProduct from "@/components/EditProduct";
import axios from "axios";

export default ({product}) => {
    return (
        <EditProduct editMode={true} data={{ productName: product.name, productDesc: product.desc, id: product.id, productCode: product.barcode }} />
    );
}

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const res = await axios.get(`http://192.168.0.45:3000/api/products/${id}`);

    return {
        props: {
            product: res.data,
        },
    };
};