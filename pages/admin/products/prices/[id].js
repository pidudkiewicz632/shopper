import AdminLayout from "@/components/AdminLayout";
import { Box, Flex, Text, VStack, useColorModeValue, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ShopItem = ({ price }) => {
    return (
        <Box bgColor={useColorModeValue('gray.200', 'gray.700')} p={3} w={'30%'}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex gap={6}>
                    <Text>{price.name}</Text>
                </Flex>
                <Flex gap={6}>
                    <Input variant='filled' type="number" value={price.price} min={0}></Input>
                </Flex>
            </Flex>
        </Box>
    );
}

export default ({product, shops}) => {
    const [shopPrices, setShopPrices] = useState([]);

    useEffect(() => {
        const prices = shops.map((shop) => {
            return {
                id: shop.id,
                name: shop.name,
                price: null,
            }
        });

        setShopPrices(prices);
    }, [])

    return (
        <AdminLayout>
            <Text fontSize='3xl' as='h2'>{product.name}</Text>
            <Text fontSize='lg' as='h3' my={4}>Ceny</Text>
            <VStack align='stretch'>
                {shopPrices.map((price, index) => <ShopItem key={price.id} price={price} />)}
            </VStack>
        </AdminLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const resProduct = await axios.get(`http://192.168.0.45:3000/api/products/${id}`);
    const resShops = await axios.get(`http://192.168.0.45:3000/api/shops/`);

    return {
        props: {
            product: resProduct.data,
            shops: resShops.data,
        },
    }
};