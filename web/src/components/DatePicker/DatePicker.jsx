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
  Icon,
  createIcon,
} from '@chakra-ui/react'

import { useForm } from '@redwoodjs/forms'
import { routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
let currentTime = new Date()
let currentMonth = currentTime.toLocaleString('default', { month: 'long' })
let isLeapYear = new Date(currentTime.getFullYear, 1, 29).getDate() === 29

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const CircleChevronDownIcon = (props) => (
  <Icon
    with={'20'}
    height={'20'}
    viewbox={'0 0 20 20'}
    fill={'none'}
    {...props}
  >
    <path
      d="M18.3334 10C18.3334 5.39767 14.6025 1.66671 10.0001 1.66671C5.39771 1.66671 1.66675 5.39767 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10Z"
      stroke="#6284FF"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9417 8.94997L10 11.8833L7.05835 8.94997"
      stroke="#6284FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

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
                    <CircleChevronDownIcon />
                  )
                }
              >
                {currentMonth}
              </MenuButton>
              <MenuList>
                {months.map((month) => (
                  <MenuItem
                    key={months.id}
                    color={'black'}
                    onClick={() => (currentMonth = month)}
                  >
                    {month}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </WrapItem>
    </Wrap>
  )
}

export default DatePicker
