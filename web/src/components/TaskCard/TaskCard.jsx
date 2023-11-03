import {Box, Button, Collapse, HStack, IconButton, Spacer, Text} from "@chakra-ui/react";

const TaskCard = ({task}) => {
    const [show, setShow] = React.useState(false);

    const handleToggle = () => setShow(!show);

    return (
      <Box backgroundColor={'white'} borderRadius={'8px'} p={'14px'}>
          <HStack>
              <Text>Test</Text>
              <Text color={'#6284FF'}>{task.title}</Text>
              <Spacer />
              <DragIcon />
              <IconButton bg='' icon={<ChevronIcon />} onClick={handleToggle}  aria-label={'expand'}/>
          </HStack>
          <Collapse mt={4} in={show}>
              <hr style={{backgroundColor: '#E2EAF1', margin: '5px'}}></hr>
              {task.notes}
          </Collapse>
      </Box>
    )
}

const DragIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.7129 8.89949L14.0654 10.7189C13.3129 11.5509 12.0226 10.4204 12.7945 9.56791L13.3084 9.00025H8.85736V13.3084L9.42502 12.7944C10.264 12.0334 11.4172 13.3037 10.576 14.0654L8.75744 15.712C8.54889 15.8974 8.2796 15.9998 8.00057 16C7.72154 16.0002 7.45213 15.898 7.24338 15.7128L5.424 14.0654C4.58165 13.3027 5.7366 12.034 6.57496 12.7944L7.14262 13.3084V9.00025H2.69154L3.20551 9.56791C3.98024 10.4236 2.67942 11.5424 1.93455 10.7189L0.287906 8.90032C0.102585 8.69175 0.000154445 8.42248 1.74514e-07 8.14347C-0.000154096 7.86446 0.101979 7.59507 0.287069 7.38629L1.93455 5.56694C2.6946 4.72671 3.96689 5.87698 3.20551 6.71789L2.69154 7.28555H7.14262V2.69164L6.57496 3.20559C5.73614 3.96637 4.58258 2.69643 5.424 1.93463L7.24255 0.288026C7.45109 0.102633 7.72038 0.000154457 7.99941 1.74459e-07C8.27845 -0.000154108 8.54785 0.102026 8.7566 0.287188L10.576 1.93462C11.4324 2.70997 10.2465 3.95019 9.42502 3.20558L8.85736 2.69163V7.28554H13.3084L12.7945 6.71788C12.0341 5.87804 13.3046 4.72513 14.0654 5.56693L15.7121 7.38545C15.8974 7.59402 15.9998 7.8633 16 8.14231C16.0001 8.42132 15.898 8.69071 15.7129 8.89949Z" fill="#292D32"/>
        </svg>
    )
}

const ChevronIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 9.99999C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 9.99999C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z" stroke="#292D32" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.05835 8.94998L10 11.8833L12.9417 8.94998" stroke="#292D32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default TaskCard
