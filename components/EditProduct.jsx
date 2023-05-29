import AdminLayout from "@/components/AdminLayout";
import TextAreaInput from "@/components/TextAreaInput";
import TextInput from "@/components/TextInput";
import { Button, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CodeInput from "./CodeInput";
import FileInput from "./FileInput";

export default ({ data, editMode }) => {
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productImages, setProductImages] = useState([]);

    const [validationStates, setValidationStates] = useState({
        productName: true,
        productDesc: true,
        productCode: true,
        productImages: true,
    });

    const [validationMessages, setValidationMessages] = useState({
        productName: '',
        productDesc: '',
        productCode: '',
        productImages: '',
    });

    const toast = useToast();

    useEffect(() => {
        if (data) {
            setProductName(data.productName);
            setProductDesc(data.productDesc);
            setProductCode(data.productCode);
        }
    }, []);

    const imagesValidation = () => {
        if (productImages.length > 4) {
            return [false, 'Maksymalna licza zdjęć to 4.']
        }

        return [true, ''];
    }

    const validation = () => {
        const newValidationState = {};
        const newMessaageState = {};

        newValidationState.productName = /^[a-zA-Z0-9 -]{3,60}$/.test(productName);
        newValidationState.productDesc = /^[a-zA-Z0-9 .,-:]{10,200}$/.test(productDesc);
        newValidationState.productCode = /^\d{1,13}$/.test(productCode);
        [newValidationState.productImages, newMessaageState.productImages] = imagesValidation();

        setValidationStates(newValidationState);

        if (!newValidationState.productName) {
            const len = productName.length;

            if (len < 3 || len > 60) {
                newMessaageState.productName = 'Długość od 3 do 60 znaków.'
            } else if (/^[a-zA-Z0-9 -]*$/.test(productName)) {
                newMessaageState.productName = 'Pole może zawierać jedynie cyfry litery, spację i -.'
            }
        }

        if (!newValidationState.productDesc) {
            const len = productDesc.length;

            if (len < 10 || len > 200) {
                newMessaageState.productDesc = 'Długość od 10 do 200 znaków.'
            } else if (/^[a-zA-Z0-9 .,-:]*$/.test(productDesc)) {
                newMessaageState.productDesc = 'Pole może zawiera niedozwolone znaki.'
            }
        }

        if (!newValidationState.productCode) {
            newMessaageState.productCode = 'Niepoprawny';
        }

        setValidationMessages(newMessaageState);

        for (const [key, value] of Object.entries(newValidationState)) {
            if (!value) {
                return false;
            }
        }

        return true;
    }

    const addProduct = () => {
        if (validation()) {
            const formData = new FormData();

            formData.append('name', productName);
            formData.append('desc', productDesc);
            formData.append('barcode', productCode);
            let index = 0;

            if(productImages) {
                for (const image of productImages) {
                    formData.append('file' + index, image);
                    index++;
                }
            }

            if (editMode) {
                axios.patch(`/api/products/update/${data.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    toast({
                        title: 'Aktualizacja Produktu.',
                        description: "Produktu został zaktualizowany.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }).catch((err) => {
                    toast({
                        title: 'Aktualizacja Produktu.',
                        description: "Wystąpił błąd.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
            } else {
                const formData = new FormData();

                formData.append('name', productName);
                formData.append('desc', productDesc);
                formData.append('barcode', productCode);
                let index = 0;

                for (const image of productImages) {
                    formData.append('file' + index, image);
                    index++;
                }

                axios.post('/api/products/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then((res) => {
                    toast({
                        title: 'Dodawanie Produktu.',
                        description: "Produktu został dodany.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }).catch((err) => {
                    toast({
                        title: 'Dodawanie Produktu.',
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
            <Text fontSize='3xl' as='h2'>{editMode ? 'Edytowanie produktu' : 'Dodawanie produktu'}</Text>
            <TextInput
                label={'Nazwa Produktu'}
                helperText={'podaj nazwę produktu'}
                errorMessage={validationMessages.productName}
                handelChange={setProductName}
                validationState={validationStates.productName}
                mt={3}
                value={productName}
            />
            <TextAreaInput
                label={'Opis Produktu'}
                helperText={'podaj opis produktu'}
                errorMessage={validationMessages.productDesc}
                handelChange={setProductDesc}
                validationState={validationStates.productDesc}
                mt={3}
                value={productDesc}
            />
            <FileInput
                label={'Zdjęcia'}
                helperText={'podaj zdjęcia produktu'}
                handelChange={setProductImages}
                errorMessage={validationMessages.productImages}
                validationState={validationStates.productImages}
                mt={3}
                w={{ base: '100%', sm: '70%', md: '55%', lg: '20%' }}
            />
            <CodeInput
                label={'Kod Produktu'}
                helperText={'podaj kod produktu lub zeskanuj'}
                errorMessage={validationMessages.productCode}
                handelChange={setProductCode}
                validationState={validationStates.productCode}
                mt={3}
                value={productCode}
            />
            <Button colorScheme='blue' mt={3} onClick={addProduct}>{editMode ? 'Zapisz' : 'Dodaj'}</Button>
        </AdminLayout>
    );
};