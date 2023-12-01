import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import {toast} from "@redwoodjs/web/toast";

const AddTaskModal = ({tasks, setTasks}) => {
  function FindID() {
    let idsArray = []
    Object.keys(tasks).map((data) => {
      tasks[data].map(({id}) => {
        idsArray.push(id)
      })
    })
    idsArray.sort()
    let i = 0
    for (; i < idsArray.length; i++) {
      if (i !== idsArray[i]) break
    }
    return i
  }

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [formData, setFormData] = useState({
    id: 1, title: '', notes: '', pomodorosComplete: 0, pomodoros: 1, status: 'NotStarted', expanded: true,
  })
  const handleChange = (field, value) => {
    setFormData((prevData) => ({...prevData, [field]: value}))
  }
  const handleSubmit = () => {
    console.log('Form data submitted:', formData)

    // force valid title
    if (formData.title.trim() === "") {
        toast.error("Title must be valid")
        return
    }

    //add new task to database
    //clear form data
    const category = 'Important'; // Adjust the category as needed
    const newTask = {
      id: FindID(),
      title: formData.title,
      notes: formData.notes,
      pomodorosComplete: formData.pomodorosComplete,
      pomodoros: formData.pomodoros,
      status: formData.status,
      expanded: formData.expanded,
    };

    setTasks((prevTasks) => ({
      ...prevTasks, [category]: [...prevTasks[category], newTask],
    }));

    setFormData({
      id: FindID(), title: '', notes: '', pomodorosComplete: 0, pomodoros: 1, status: 'NotStarted', expanded: true,
    })

    onClose()
  }

  return (
    <>
      <IconButton
        isRound={true}
        w="39px"
        h="39px"
        variant="solid"
        colorScheme="blue"
        aria-label="add task"
        icon={<AddIcon color="white" h="16px" w="16px"/>}
        ml=".5vw"
        mb=".5vw"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Create New task</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormControl>
              <FormLabel>Task Title</FormLabel>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Pomodoro Timer</FormLabel>
              <NumberInput
                min={0}
                defaultValue={1}
                value={formData.pomodoros}
                onChange={(valueString) => handleChange('pomodoros', parseInt(valueString, 10))}
              >
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Task Notes</FormLabel>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mt={5} mr={3} colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button mt={5} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTaskModal
