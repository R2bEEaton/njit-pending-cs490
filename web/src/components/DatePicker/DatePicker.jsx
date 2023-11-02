import { ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { useForm } from '@redwoodjs/forms'
import { routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

let month = new Date().toLocaleString('default', { month: 'long' })

const DatePicker = () => {
  return (
    <Box bg={'#6284FF26'} borderRadius={'md'} color={'white'}>
      <Menu size={'md'}>
        <MenuButton as={Button} rightIcon={<ChevronUpIcon />}>
          {month}
        </MenuButton>
        <MenuList>
          <MenuItem color={'black'}>January</MenuItem>
          <MenuItem color={'black'}>February</MenuItem>
          <MenuItem color={'black'}>March</MenuItem>
          <MenuItem color={'black'}>April</MenuItem>
          <MenuItem color={'black'}>May</MenuItem>
          <MenuItem color={'black'}>June</MenuItem>
          <MenuItem color={'black'}>July</MenuItem>
          <MenuItem color={'black'}>August</MenuItem>
          <MenuItem color={'black'}>September</MenuItem>
          <MenuItem color={'black'}>October</MenuItem>
          <MenuItem color={'black'}>November</MenuItem>
          <MenuItem color={'black'}>December</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default DatePicker
