import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FaBarcode } from 'react-icons/fa';
import Scanner from "./Scanner";

export default ({ label, helperText, errorMessage, handelChange, validationState, value, ...rest }) => {
    const [input, setInput] = useState('');
    const [camera, setCamera] = useState(false);

    const onDetected = result => {
        setInput(result);
        handelChange(result);
        onClose();
    };

    const onClose = () => {
        setCamera(false);
    };

    useEffect(() => {
        setInput(value);
    }, [value])

    const handleInputChange = (e) => {
        setInput(e.target.value);
        handelChange(e.target.value);
    };

    return (
        <FormControl isInvalid={!validationState} {...rest} >
            <FormLabel>{label}</FormLabel>
            <Flex>
                <Input type='text' value={input} onChange={handleInputChange} bg={useColorModeValue('white.200', 'white.700')} />
                <IconButton colorScheme="blue" onClick={() => setCamera(!camera)}>
                    <FaBarcode />
                </IconButton>
            </Flex>
            {validationState ? (
                <FormHelperText>
                    {helperText}
                </FormHelperText>
            ) : (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            )}
            {camera && <Scanner onDetected={onDetected} onClose={onClose} />}
        </FormControl>
    )
}