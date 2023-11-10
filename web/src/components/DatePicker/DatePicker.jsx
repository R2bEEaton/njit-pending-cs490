import { useState } from 'react'

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
  IconButton,
} from '@chakra-ui/react'
import moment from 'moment'
import { mockComponent } from 'react-dom/test-utils'

import { useForm } from '@redwoodjs/forms'
import { routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

let currentTime = new Date()
let year = currentTime.getFullYear()

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

const DatePicker = () => {
  const [month, setMonth] = useState(
    currentTime.toLocaleString('default', { month: 'long' })
  )
  const [day, setDay] = useState(currentTime.getDay())
  let numDays = moment(
    year + '-' + (months.indexOf(month) + 1),
    'YYYY-MM'
  ).daysInMonth()
  let days = [Array.from({ length: numDays }, (_, i) => i + 1)]
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
        <HStack spacing={'3'}>
          <IconButton
            icon={<ArrowCircleLeftIcon />}
            fill={'none'}
            outlineColor={'#6284FF'}
            onClick={() =>
              setMonth(
                months[
                  (months.indexOf(month) - 1 + months.length) % months.length
                ]
              )
            }
          ></IconButton>
          <Menu size={'md'}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  outlineColor={'#6284FF'}
                  fill={'none'}
                  rightIcon={
                    isOpen ? (
                      <ChevronUpIcon color={'#6284FF'} />
                    ) : (
                      <CircleChevronDownIcon />
                    )
                  }
                >
                  {month}
                </MenuButton>
                <MenuList>
                  {months.map((month) => (
                    <MenuItem
                      key={months.id}
                      color={'black'}
                      onClick={() => setMonth(month)}
                    >
                      {month}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>

          <IconButton
            icon={<ArrowCircleRightIcon />}
            fill={'none'}
            outlineColor={'#6284FF'}
            onClick={() =>
              setMonth(months[(months.indexOf(month) + 1) % months.length])
            }
          ></IconButton>
        </HStack>
      </WrapItem>

      <WrapItem>
        <HStack spacing={'3'}>
          <IconButton
            icon={<ArrowCircleLeftIcon />}
            fill={'none'}
            outlineColor={'#6284FF'}
            onClick={() =>
              setMonth(
                months[
                  (months.indexOf(month) - 1 + months.length) % months.length
                ]
              )
            }
          ></IconButton>
          <Menu size={'md'}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  outlineColor={'#6284FF'}
                  fill={'none'}
                  rightIcon={
                    isOpen ? (
                      <ChevronUpIcon color={'#6284FF'} />
                    ) : (
                      <CircleChevronDownIcon />
                    )
                  }
                >
                  {day}
                </MenuButton>

                <MenuList>
                  {days.map((day) => (
                    <MenuItem
                      key={days.id}
                      color={'black'}
                      onClick={() => setDay(day)}
                    >
                      {day}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>

          <IconButton
            icon={<ArrowCircleRightIcon />}
            fill={'none'}
            outlineColor={'#6284FF'}
            onClick={() =>
              setMonth(months[(months.indexOf(month) + 1) % months.length])
            }
          ></IconButton>
        </HStack>
      </WrapItem>
    </Wrap>
  )
}

export default DatePicker

const ArrowCircleLeftIcon = (props) => (
  <Icon width="23" height="22" viewBox="0 0 23 22" fill="none" {...props}>
    <path
      d="M11.4999 1.83335C16.5625 1.83335 20.6666 5.93741 20.6666 11C20.6666 16.0626 16.5625 20.1667 11.4999 20.1667C6.43731 20.1667 2.33325 16.0626 2.33325 11C2.33325 5.93741 6.43731 1.83335 11.4999 1.83335Z"
      fill="#6284FF"
      stroke="#6284FF"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6551 7.7642L9.42847 11L12.6551 14.2359"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

const ArrowCircleRightIcon = (props) => (
  <Icon width="23" height="22" viewBox="0 0 23 22" fill="none" {...props}>
    <path
      d="M11.5001 1.83335C6.43747 1.83335 2.33342 5.93741 2.33342 11C2.33342 16.0626 6.43747 20.1667 11.5001 20.1667C16.5627 20.1667 20.6667 16.0626 20.6667 11C20.6667 5.93741 16.5627 1.83335 11.5001 1.83335Z"
      fill="#6284FF"
      stroke="#6284FF"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.3449 7.7642L13.5715 11L10.3449 14.2359"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

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