import { Inter } from 'next/font/google'
import { Box, Button, Center } from '@chakra-ui/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Box w='100%'>
        <Center w='100%' h='100vh'>
          <Box>
            <Link href={`/shops`}>
              <Button colorScheme='blue'>
                Rozpocznij
              </Button>
            </Link>
          </Box>
        </Center>
      </Box>
    </>
  )
}
