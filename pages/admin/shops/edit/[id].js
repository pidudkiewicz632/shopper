import EditShop from "@/components/EditShop";
import axios from "axios";

export default ({shop}) => {
    return (
        <EditShop editMode={true} data={{ shopName: shop.name, shopDesc: shop.desc, id: shop.id}} />
    );
}

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const res = await axios.get(`http://192.168.0.45:3000/api/shops/${id}`);

    return {
        props: {
            shop: res.data,
        },
    };
};