/*const FocusTimeModal = () => {
  return (
    <div>
      <h2>{'FocusTimeModal'}</h2>
      <p>
        {'Find me in ./web/src/components/FocusTimeModal/FocusTimeModal.jsx'}
      </p>
    </div>
  )
}

export default FocusTimeModal
*/
// components/FocusTimeModal.js
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const FocusTimeModal = ({ isOpen, onClose, taskTitle }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Focus Time</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Task: {taskTitle}</p>
          {/* Add additional content as needed */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Add additional buttons or actions as needed */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FocusTimeModal;
