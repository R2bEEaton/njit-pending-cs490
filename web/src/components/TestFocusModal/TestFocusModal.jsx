import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

import Timer from 'src/components/Timer/Timer'

const TestFocusModal = ({ isOpen, onOpen, onClose, note, title }) => {
  //const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Title: ' + title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Timer numMinutes={25} />
            {'Notes: ' + note}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TestFocusModal
