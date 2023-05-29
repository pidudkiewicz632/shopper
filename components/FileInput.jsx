import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export default ({label, helperText, handelChange, errorMessage, validationState, ...rest}) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.files);
        handelChange(e.target.files);
        console.log(e.target.files);
    };
  
    return (
      <FormControl isInvalid={!validationState} {...rest} >
        <FormLabel>{label}</FormLabel>
        <Input type='file' onChange={handleInputChange} bg={useColorModeValue('white.200', 'white.700')} multiple/>
        {validationState ? (
          <FormHelperText>
            {helperText}
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    )
}