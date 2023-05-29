import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios';
import Link from 'next/link'

const ShopItem = ({ shop }) => {
    return (
        <Link href={`/shops/${shop.id}`}>
            <Box bgColor={useColorModeValue('gray.200', 'gray.700')} p={3}>
                <Text>{shop.name}</Text>
            </Box>
        </Link>
    );
}

export default ({ shops }) => {
    return (
        <Box w='100%' p={3}>
            <Text fontSize='3xl' as='h2'>Wybierz sklep</Text>
            <VStack align='stretch'>
                {shops.map((shop, index) => <ShopItem key={shop.id} index={index} shop={shop} />)}
            </VStack>
        </Box>
    )
}

export const getServerSideProps = async (ctx) => {
    const res = await axios.get("http://192.168.0.45:3000/api/shops");

    return {
        props: {
            shops: res.data,
        },
    };
};
