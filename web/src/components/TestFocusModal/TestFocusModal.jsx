import { useEffect, useState } from 'react'

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

import { useAuth } from 'src/auth'
import Timer from 'src/components/Timer/Timer'

const TestFocusModal = ({
  isOpen,
  onOpen,
  onClose,
  note,
  title,
  pomos,
  numPomosComplete,
  updateNumPomosComplete,
}) => {
  //const { isOpen, onOpen, onClose } = useDisclosure()

  const { currentUser, reauthenticate } = useAuth()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Title: ' + title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {'Pomodoro: '}{' '}
            <Timer
              isPomo={true}
              numPomos={pomos}
              numMinutes={currentUser.pomodoro}
              numPomosComplete={numPomosComplete}
              updateNumPomosComplete={updateNumPomosComplete}
            />
            {'Short Break: '} <Timer numMinutes={currentUser.shortBreak} />
            {'Long Break: '} <Timer numMinutes={currentUser.longBreak} />
            <Text>{'Notes: ' + note}</Text>
            <Text>{'Pomos: ' + numPomosComplete + '/' + pomos}</Text>
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
