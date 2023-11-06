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

let month = new Date().toLocaleString('default', { month: 'long' })

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
