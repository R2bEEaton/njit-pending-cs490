import {useEffect, useRef, useState} from 'react'
import {
    Box,
    Collapse,
    HStack,
    Spacer,
    Text,
    Image, Editable, EditableTextarea, EditablePreview, useEditableControls
} from '@chakra-ui/react'

import {useAuth} from 'src/auth'
import TextareaAutosize from 'react-textarea-autosize'
import {v4 as uuidv4} from "uuid"
import FocusTimeModal from "src/components/FocusTimeModal/FocusTimeModal";

const getStatusFromIndex = (n) => {
    switch (n) {
        case 0:
            return 'NotStarted'
        case 1:
            return 'InProgress'
        case 2:
            return 'Completed'
        case 3:
            return 'Rollover'
        case 4:
            return 'Cancelled'
    }
}

const StatusIcons = ({status, callback, task, idx, setTaskStatus}) => {
    const images = [
        'img/not_started.svg',
        'img/in_progress.svg',
        'img/completed.svg',
        'img/rollover.svg',
        'img/cancelled.svg',
    ]

    const getIndexFromStatus = (status) => {
        switch (status) {
            case 'NotStarted':
                return 0
            case 'InProgress':
                return 1
            case 'Completed':
                return 2
            case 'Rollover':
                return 3
            case 'Cancelled':
                return 4
            default:
                return 0 // Default to the first image if status is not recognized
        }
    }
    let currentIndex = getIndexFromStatus(status)


    const changeImage = () => {
        currentIndex = (currentIndex + 1) % images.length
        task.status = getStatusFromIndex((currentIndex + 1) % images.length)
        setTaskStatus(task.status)
        //console.log(getStatusFromIndex((currentIndex + 1) % images.length))
        callback(idx, task, true)
    }

    return (
        <>
            <Box w="22px" h="22px" rounded="md" color="white" borderColor="#ccd0d5">
                <Image className="task_progress" src={images[currentIndex]} alt="Status_icons" onClick={changeImage}
                       w="20px" h="20px" cursor={'pointer'}/>
            </Box>
        </>
    )
}

const TaskCard = ({dragHandle, task, idx, callback, isDragging = false}) => {
    const [pomosEdit, setPomosEdit] = useState(false);
    const {currentUser} = useAuth()

    const [show, setShow] = useState(task.expanded)
    const [pomos, setPomos] = useState(task.pomodoros)
    const [notes, setNotes] = useState(task.notes)
    const [taskStatus, setTaskStatus] = useState(task.status)

    const notesBox = useRef()

    /**
     * Update states that depend on task
     */
    useEffect(() => {
        setShow(task.expanded)
        setPomosEdit(false)
        setPomos(task.pomodoros)
        setNotes(task.notes)
        setTaskStatus(task.status)
    }, [task]);

    /**
     * Button for editing the notes
     * @returns {JSX.Element}
     * @constructor
     */
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <button {...getSubmitButtonProps()}>
                <EditIcon active={isEditing}/>
            </button>
        ) : (
            <button {...getEditButtonProps()}>
                <EditIcon active={isEditing}/>
            </button>
        )
    }

    const handleToggle = () => setShow(!show);

    const handleNotes = (value) => {
        if (task.notes === value) return // If the notes actually changed
        task.notes = value
        setNotes(value)
        callback(idx, task)
    }

    const handlePomosToggle = () => {
        setPomosEdit(!pomosEdit);
        // If the user confirms a pomodoros edit, send it back to the parent as a save-worthy change
        if (pomosEdit) {
            task.pomodoros = pomos
            callback(idx, task)
        }
    }

    /**
     * Function for updating the pomodoros by + or - 1
     * @param by
     */
    function updatePomos(by) {
        // Update pomodoro state
        if (pomos + by < 0) {
            return
        }
        setPomos(pomos + by)
    }

    useEffect(() => {
        // Whenever a user opens a card, it will send it back to the parent as a non-save-worthy change
        // Maybe a card being open is save-worthy?
        task.expanded = show
        callback(idx, task)
    }, [show])

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTaskTitle, setSelectedTaskTitle] = useState('');
    const [selectedNotes, setSelectedNotes] = useState('');
  
    const handleTaskTitleClick = (title, notes) => {
      setSelectedTaskTitle(title);
      setSelectedNotes(notes)
      setModalOpen(true);
    };

    return (
        <>
            <Box backgroundColor={'white'} borderRadius={'8px'} p={'14px'}
                 outline={isDragging ? '1px solid lightgray' : 'none'}>
                <HStack>
                    <StatusIcons
                        status={taskStatus}
                        callback={callback}
                        task={task}
                        idx={idx}
                        setTaskStatus={setTaskStatus}
                        _hover={{ cursor: 'pointer' }}
                    />
                    <Text color={'#6284FF'} onClick={() => handleTaskTitleClick(task.title, task.notes)} _hover={{ cursor: 'pointer' }}>
                        {task.title}
                    </Text>
                    <Spacer/>
                    <Box {...dragHandle}>
                        <DragIcon/>
                    </Box>
                    <button onClick={handleToggle} aria-label={'expand'}>
                        <ChevronIcon active={show}/>
                    </button>
                </HStack>
                <Collapse mt={4} in={show}>
                    <hr style={{backgroundColor: '#E2EAF1', margin: '5px'}}></hr>
                    <HStack>
                        <Text fontSize={'12px'} color={'#1F1F1F'}>Number of Pomodoro Timers
                            ({currentUser?.pomodoro} mins each)</Text>
                        <Spacer/>
                        <button aria-label="increment pomodoros" hidden={!pomosEdit} onClick={() => {
                            updatePomos(1)
                        }}>
                            <PlusIcon/>
                        </button>
                        <Text fontSize={'16px'} color={'#FE754D'} aria-label={'pomodoros'}>{pomos}</Text>
                        <button aria-label="decrement pomodoros" hidden={!pomosEdit} onClick={() => {
                            updatePomos(-1)
                        }}>
                            <MinusIcon/>
                        </button>
                        <button onClick={handlePomosToggle} aria-label={'edit pomodoros'}>
                            <EditIcon active={pomosEdit}/>
                        </button>
                    </HStack>
                    <Editable key={uuidv4()} w={'100%'} defaultValue={notes} isPreviewFocusable={false} submitOnBlur={false}
                              onSubmit={handleNotes} selectAllOnFocus={false} ref={notesBox}>
                        <HStack align={'flex-start'}>
                            <Box w={'100%'}>
                                <Text fontSize={'12px'} color={'#545454'}>Notes</Text>
                                <EditablePreview />
                                <EditableTextarea as={TextareaAutosize} resize={'none'} border={'none'}
                                                  style={{outlineColor: "white", boxShadow: "none"}}/>
                            </Box>
                            <Spacer/>
                            <EditableControls/>
                        </HStack>
                    </Editable>
                </Collapse>
            </Box>
            <FocusTimeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} taskTitle={selectedTaskTitle} taskNotes={selectedNotes} />
        </>
    )
}

const DragIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M15.7129 8.89949L14.0654 10.7189C13.3129 11.5509 12.0226 10.4204 12.7945 9.56791L13.3084 9.00025H8.85736V13.3084L9.42502 12.7944C10.264 12.0334 11.4172 13.3037 10.576 14.0654L8.75744 15.712C8.54889 15.8974 8.2796 15.9998 8.00057 16C7.72154 16.0002 7.45213 15.898 7.24338 15.7128L5.424 14.0654C4.58165 13.3027 5.7366 12.034 6.57496 12.7944L7.14262 13.3084V9.00025H2.69154L3.20551 9.56791C3.98024 10.4236 2.67942 11.5424 1.93455 10.7189L0.287906 8.90032C0.102585 8.69175 0.000154445 8.42248 1.74514e-07 8.14347C-0.000154096 7.86446 0.101979 7.59507 0.287069 7.38629L1.93455 5.56694C2.6946 4.72671 3.96689 5.87698 3.20551 6.71789L2.69154 7.28555H7.14262V2.69164L6.57496 3.20559C5.73614 3.96637 4.58258 2.69643 5.424 1.93463L7.24255 0.288026C7.45109 0.102633 7.72038 0.000154457 7.99941 1.74459e-07C8.27845 -0.000154108 8.54785 0.102026 8.7566 0.287188L10.576 1.93462C11.4324 2.70997 10.2465 3.95019 9.42502 3.20558L8.85736 2.69163V7.28554H13.3084L12.7945 6.71788C12.0341 5.87804 13.3046 4.72513 14.0654 5.56693L15.7121 7.38545C15.8974 7.59402 15.9998 7.8633 16 8.14231C16.0001 8.42132 15.898 8.69071 15.7129 8.89949Z"
                fill="#292D32"/>
        </svg>
    )
}

const ChevronIcon = ({
                         active
                     }) => {
    if (active) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 9.99999C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 9.99999C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
                    stroke="#292D32" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path d="M7.05835 8.94998L10 11.8833L12.9417 8.94998" stroke="#292D32" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path
                    d="M8.99988 16.5C13.142 16.5 16.4999 13.1422 16.4999 9.00003C16.4999 4.85789 13.142 1.50003 8.99988 1.50003C4.85774 1.50003 1.49988 4.85789 1.49988 9.00003C1.49988 13.1422 4.85774 16.5 8.99988 16.5Z"
                    stroke="#292D32" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path d="M8.05493 11.6475L10.6949 8.99998L8.05493 6.35248" stroke="#292D32" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }
}

const EditIcon = ({
                      active
                  }) => {
    if (active) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 10 8" fill="none">
                <path
                    d="M3.55523 7.77551C3.43946 7.89796 3.27545 8 3.13073 8C2.98601 8 2.822 7.89286 2.7014 7.77041L0 4.91327L0.858659 4.0051L3.13555 6.41326L9.15581 0L10 0.923469L3.55523 7.77551Z"
                    fill="#6284FF"/>
            </svg>
        )
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M8.84006 2.39997L3.36673 8.1933C3.16006 8.4133 2.96006 8.84664 2.92006 9.14664L2.6734 11.3066C2.58673 12.0866 3.14673 12.62 3.92006 12.4866L6.06673 12.12C6.36673 12.0666 6.78673 11.8466 6.9934 11.62L12.4667 5.82664C13.4134 4.82664 13.8401 3.68664 12.3667 2.2933C10.9001 0.913305 9.78673 1.39997 8.84006 2.39997Z"
                    stroke="#6284FF" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path d="M7.92676 3.36667C8.21342 5.20667 9.70676 6.61334 11.5601 6.8" stroke="#6284FF"
                      strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 14.6667H14" stroke="#6284FF" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </svg>
        )
    }
}

const PlusIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.6665 10H13.3332" stroke="#9FA3A8" strokeWidth="1.2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M10 13.3334V6.66669" stroke="#9FA3A8" strokeWidth="1.2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
                d="M7.49984 18.3334H12.4998C16.6665 18.3334 18.3332 16.6667 18.3332 12.5V7.50002C18.3332 3.33335 16.6665 1.66669 12.4998 1.66669H7.49984C3.33317 1.66669 1.6665 3.33335 1.6665 7.50002V12.5C1.6665 16.6667 3.33317 18.3334 7.49984 18.3334Z"
                stroke="#9FA3A8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const MinusIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.6665 10H13.3332" stroke="#9FA3A8" strokeWidth="1.2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
                d="M7.49984 18.3334H12.4998C16.6665 18.3334 18.3332 16.6667 18.3332 12.5V7.50002C18.3332 3.33335 16.6665 1.66669 12.4998 1.66669H7.49984C3.33317 1.66669 1.6665 3.33335 1.6665 7.50002V12.5C1.6665 16.6667 3.33317 18.3334 7.49984 18.3334Z"
                stroke="#9FA3A8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default TaskCard
