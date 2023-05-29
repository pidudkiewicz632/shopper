import AdminLayout from "@/components/AdminLayout";
import TextAreaInput from "@/components/TextAreaInput";
import TextInput from "@/components/TextInput";
import { Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default ({data, editMode}) => {
    const [shopName, setShopName] = useState('');
    const [shopDesc, setShopDesc] = useState('');
    const [validationStates, setValidationStates] = useState({
        shopName: true,
        shopDesc: true,
    });

    const [validationMessages, setValidationMessages] = useState({
        shopName: '',
        shopDesc: '',
    });

    const toast = useToast();

    useEffect(() => {
        console.log(data);
        if(data) {
            setShopName(data.shopName);
            setShopDesc(data.shopDesc);
        }
    }, []);

    const validation = () => {
        const newValidationState = {};
        const newMessaageState = {};

        newValidationState.shopName = /^[a-zA-Z0-9 -]{3,60}$/.test(shopName);
        newValidationState.shopDesc = /^[a-zA-Z0-9 .,-:]{10,200}$/.test(shopDesc);

        setValidationStates(newValidationState);

        if(!newValidationState.shopName) {
            const len = shopName.length;

            if(len < 3 || len > 60) {
                newMessaageState.shopName = 'Długość od 3 do 60 znaków.'
            } else if(/^[a-zA-Z0-9 -]*$/.test(shopName)) {
                newMessaageState.shopName = 'Pole może zawierać jedynie cyfry litery, spację i -.'
            }
        }

        if(!newValidationState.shopDesc) {
            const len = shopDesc.length;

            if(len < 10 || len > 200) {
                newMessaageState.shopDesc = 'Długość od 10 do 200 znaków.'
            } else if(/^[a-zA-Z0-9 .,-:]*$/.test(shopDesc)) {
                newMessaageState.shopDesc = 'Pole może zawiera niedozwolone znaki.'
            }
        }

        setValidationMessages(newMessaageState);

        for (const [key, value] of Object.entries(newValidationState)) {
            if(!value) {
                return false;
            }
        }

        return true;
    }

    const addProduct = () => {
        if(validation()) {
            if(editMode) {
                axios.patch(`/api/shops/${data.id}`, {
                    name: shopName,
                    desc: shopDesc,
                }).then((res) => {
                    toast({
                        title: 'Aktualizacja Sklepu.',
                        description: "Sklep został zaktualizowany.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }).catch((err) => {
                    toast({
                        title: 'Aktualizacja Sklepu.',
                        description: "Wystąpił błąd.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
            } else {
                axios.post('/api/shops/', {
                    name: shopName,
                    desc: shopDesc,
                }).then((res) => {
                    toast({
                        title: 'Dodawanie Sklepu.',
                        description: "Sklep został dodany.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }).catch((err) => {
                    toast({
                        title: 'Dodawanie Sklepu.',
                        description: "Wystąpił błąd.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
            }
        }
    };

    return (
        <AdminLayout>
            <Text fontSize='3xl' as='h2'>Dodawanie sklepu</Text>
            <TextInput
                label={'Nazwa Sklepu'}
                helperText={'podaj nazwę sklepu'}
                errorMessage={validationMessages.shopName}
                handelChange={setShopName}
                validationState={validationStates.shopName}
                mt={3}
                value={shopName}
            />
            <TextAreaInput
                label={'Opis Sklepu'}
                helperText={'podaj opis sklepu'}
                errorMessage={validationMessages.shopDesc}
                handelChange={setShopDesc}
                validationState={validationStates.shopDesc}
                mt={3}
                value={shopDesc}
            />
            <Button colorScheme='blue' mt={3} onClick={addProduct}>{ editMode ? 'Zapisz' : 'Dodaj'}</Button>
        </AdminLayout>
    );
};