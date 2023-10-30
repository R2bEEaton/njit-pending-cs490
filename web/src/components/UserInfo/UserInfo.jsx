import { Link, routes } from '@redwoodjs/router';
import { Box, Image, Flex,} from '@chakra-ui/react';
import { useAuth } from 'src/auth'
const UserInfo = ({ currentUser }) => {
  if (!currentUser || !currentUser.picture) {
    return null; // Handle the case where picture is missing or undefined.
  }
    return (
      <Flex alignItems="center" justifyContent="flex-end" w="100%" h="100%">
        
        <Box marginRight="10px">
        <Link to={routes.settings()}>
          <img
            src={currentUser.picture}
            alt="Profile Picture"
            width="45px"
            height="45px"
            style={{ borderRadius: '50%' }} // Apply a border radius to make it circular
          />
        </Link>
        </Box>
        <Box paddingRight="10px">
          <div>{currentUser.name}</div>
          {/* Add additional elements as needed (e.g., user position) */}
        </Box>
      </Flex>    
  );
};

export default UserInfo;



