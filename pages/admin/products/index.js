import AdminLayout from "@/components/AdminLayout";
import ConfirmModal from "@/components/ConfirmModal";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Text, VStack, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import {
    FiEdit2,
} from 'react-icons/fi';

import {
    GiPriceTag,
} from 'react-icons/gi'

import {
    MdDelete,
} from 'react-icons/md';

const ProductItem = ({ product, showConfirm, index }) => {
    return (
        <Box bgColor={useColorModeValue('gray.200', 'gray.700')} p={3}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex gap={6}>
                    <Text>{index + 1}</Text>
                    <Text>{product.name}</Text>
                </Flex>
                <Flex gap={3}>
                    <Link href={`/admin/products/edit/${product.id}`}>
                        <IconButton colorScheme="blue">
                            <GiPriceTag />
                        </IconButton>
                    </Link>
                    <Link href={`/admin/products/edit/${product.id}`}>
                        <IconButton colorScheme="blue">
                            <FiEdit2 />
                        </IconButton>
                    </Link>
                    <IconButton colorScheme="blue" onClick={showConfirm}>
                        <MdDelete />
                    </IconButton>
                </Flex>
            </Flex>
        </Box>
    );
}

export default ({ products }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [productToDelete, setProductToDelete] = useState();
    const [productList, setProductList] = useState(products);

    const toast = useToast();

    const showConfirm = (shopId) => {
        setProductToDelete(shopId);
        onOpen();
    };

    const closeConfirm = (confirmed) => {
        if (confirmed) {
            axios.delete(`/api/products/${productToDelete}`).then((res) => {
                toast({
                    title: 'Usuwanie Produktu.',
                    description: 'Produkt został usunięty.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });

                setProductList(
                    productList.filter((item) => item.id !== productToDelete)
                );
            }).catch((err) => {
                toast({
                    title: 'Usuwanie Produktu.',
                    description: 'Wystąpił błąd.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            });
        }

        onClose();
    };

    return (
        <AdminLayout>
            <Link href={`/admin/products/add`}>
                <Button colorScheme="blue" mb={3}>
                    Dodaj nowy
                    <AddIcon ml={3}/>
                </Button>
            </Link>
            <VStack align='stretch'>
                {productList.map((product, index) => <ProductItem key={product.id} index={index} product={product} showConfirm={() => showConfirm(product.id)} />)}
            </VStack>
            <ConfirmModal isOpen={isOpen} onClose={closeConfirm} />
        </AdminLayout>
    );
};

export const getServerSideProps = async (ctx) => {
    const res = await axios.get("http://192.168.0.45:3000/api/products");

    return {
        props: {
            products: res.data,
        },
    };
};