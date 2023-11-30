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
  Text,
} from '@chakra-ui/react'

import Timer from 'src/components/Timer/Timer'

const TestFocusModal = ({ isOpen, onOpen, onClose, note, title, pomos }) => {
  //const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Title: ' + title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {'Pomodoro: '} <Timer numMinutes={25} />
            {'Short Break: '} <Timer numMinutes={25} />
            {'Long Break: '} <Timer numMinutes={25} />
            <Text>{'Notes: ' + note}</Text>
            <Text>{'Pomos: ' + pomos}</Text>
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
