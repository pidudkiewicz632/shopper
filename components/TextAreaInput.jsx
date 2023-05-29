import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export default ({label, helperText, errorMessage, handelChange, validationState, value, ...rest}) => {
    const [input, setInput] = useState('');

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
        <Textarea value={input} onChange={handleInputChange} bg={useColorModeValue('white.200', 'white.700')} />
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