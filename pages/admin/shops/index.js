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
    MdDelete,
} from 'react-icons/md';

const ShopItem = ({ shop, showConfirm, index }) => {
    return (
        <Box bgColor={useColorModeValue('gray.200', 'gray.700')} p={3}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex gap={6}>
                    <Text>{index + 1}</Text>
                    <Text>{shop.name}</Text>
                </Flex>
                <Flex gap={3}>
                    <Link href={`/admin/shops/edit/${shop.id}`}>
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

export default ({ shops }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [shopToDelete, setShopToDelete] = useState();
    const [shopList, setShopList] = useState(shops);

    const toast = useToast();

    const showConfirm = (shopId) => {
        setShopToDelete(shopId);
        onOpen();
    };

    const closeConfirm = (confirmed) => {
        if (confirmed) {
            axios.delete(`/api/shops/${shopToDelete}`).then((res) => {
                toast({
                    title: 'Usuwanie Sklepu.',
                    description: "Sklep został usunięty.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });

                setShopList(
                    shopList.filter((item) => item.id !== shopToDelete)
                );
            }).catch((err) => {
                toast({
                    title: 'Usuwanie Sklepu.',
                    description: "Wystąpił błąd.",
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
            <Link href={`/admin/shops/add`}>
                <Button colorScheme="blue" mb={3}>
                    Dodaj nowy
                    <AddIcon ml={3}/>
                </Button>
            </Link>
            <VStack align='stretch'>
                {shopList.map((shop, index) => <ShopItem key={shop.id} index={index} shop={shop} showConfirm={() => showConfirm(shop.id)} />)}
            </VStack>
            <ConfirmModal isOpen={isOpen} onClose={closeConfirm} />
        </AdminLayout>
    );
};

export const getServerSideProps = async (ctx) => {
    const res = await axios.get("http://192.168.0.45:3000/api/shops");

    return {
        props: {
            shops: res.data,
        },
    };
};