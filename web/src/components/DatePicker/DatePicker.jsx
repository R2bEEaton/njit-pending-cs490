import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
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
  Wrap,
  WrapItem,
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
    <Wrap
      spacing={'30px'}
      h={'60px'}
      bg={'#6284FF26'}
      borderRadius={'md'}
      justify={'center'}
      align={'center'}
    >
      <WrapItem>
        <Menu size={'md'}>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                outlineColor={'#6284FF'}
                rightIcon={
                  isOpen ? (
                    <ChevronUpIcon color={'#6284FF'} />
                  ) : (
                    <ChevronDownIcon color={'#6284FF'} />
                  )
                }
              >
                {month}
              </MenuButton>
              <MenuList>
                <MenuItem color={'black'} onClick={() => (month = 'January')}>
                  January
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'February')}>
                  February
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'March')}>
                  March
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'April')}>
                  April
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'May')}>
                  May
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'June')}>
                  June
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'July')}>
                  July
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'August')}>
                  August
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'September')}>
                  September
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'October')}>
                  October
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'November')}>
                  November
                </MenuItem>
                <MenuItem color={'black'} onClick={() => (month = 'December')}>
                  December
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </WrapItem>
    </Wrap>
  )
}

export default DatePicker
