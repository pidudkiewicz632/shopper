import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Scanner from '@/components/Scanner'
import { useState } from 'react'
import { Box, Button, Center } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState(null);

  const onDetected = result => {
    setResult(result);
    onClose();
  };

  const onClose = () => {
    setCamera(false);
  };

  return (
    <>
      <Box w='100%'>
        <Center w='100%' h='100vh'>
          <Box>
            <p>{result ? result : "Scanning..."}</p>
            <Button colorScheme='blue' onClick={() => setCamera(!camera)}>
              Rozpocznij Skanowanie
            </Button>
          </Box>
        </Center>
        {camera && <Scanner onDetected={onDetected} onClose={onClose} />}
      </Box>
    </>
  )
}
