import AdminLayout from "@/components/AdminLayout";
import { Box, Flex, Text, VStack, useColorModeValue, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ShopItem = ({ price, changePrice }) => {

    const handleChange = (e) => {
        changePrice(price.id, e.target.value);
    };

    return (
        <Box bgColor={useColorModeValue('gray.200', 'gray.700')} p={3} w={{ base: '100%', sm: '70%', md: '55%', lg: '30%' }}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex gap={6}>
                    <Text>{price.name}</Text>
                </Flex>
                <Flex gap={6}>
                    <Input variant='filled' type="number" value={price.price} min={0} onChange={handleChange}></Input>
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
                price: 0,
            }
        });

        setShopPrices(prices);
    }, [])

    const save = () => {
        console.log(shopPrices);
    };

    const changePrice = (shopId, price) => {
        setShopPrices(
            shopPrices.map(item => 
                item.id === shopId
                ? {...item, price}
                : item 
        ))
    };

    return (
        <AdminLayout>
            <Text fontSize='3xl' as='h2'>{product.name}</Text>
            <Text fontSize='lg' as='h3' my={4}>Ceny</Text>
            <VStack align='stretch'>
                {shopPrices.map((price, index) => <ShopItem key={price.id} price={price} changePrice={changePrice}/>)}
            </VStack>
            <Button colorScheme='blue' mt={3} onClick={save}>Zapisz</Button>
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