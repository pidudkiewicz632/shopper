import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

  export default ({ isOpen, onClose } ) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Usuwanie</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Czy na pewno chcesz usunąć?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => onClose(false) }>
                Nie
              </Button>
              <Button colorScheme='red' onClick={() => onClose(true) }>Tak</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }