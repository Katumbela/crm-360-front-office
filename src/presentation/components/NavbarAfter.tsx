import { ChevronDownIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";

import {
  FaUser,
  FaUsers,
  FaTelegramPlane,
  FaPlug,
  FaWrench,
  FaCreditCard,
  FaRegFileCode,
  FaDotCircle,
  FaBell,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { IoShieldCheckmark } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo-new-2.png";
import { useSelector } from "react-redux";
import { useAuth } from "../../main/hooks";
import { useDispatch } from "react-redux";
import { removeAuthStore } from "../../store";

export const NavbarAfter = () => {
  const navigate = useNavigate();
  const account = useSelector(useAuth())
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(removeAuthStore())
    navigate("/login");
  };

  const hoverStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <Flex
      w="100%"
      justifyContent="space-around"
      padding={3}
      border="1px"
      bg="#00FF99"
      color="whiteAlpha.700"
      fontSize="1.1rem"
    >
      <Menu>
        {/*   
        <MenuButton
          as={IconButton}
          bg="none"
          _hover={{
            bg: "none",
            color: "white",
          }}
          color="black"
          fontSize="2xl"
          icon={<GiHamburgerMenu />}
          display={{ base: "inline", md: "none" }}
        >
        </MenuButton>*/}
        <MenuList color="black" display="flex" flexDirection="column" gap="5">
          <MenuItem>
            <Link _hover={hoverStyle}>Campanhas </Link>
          </MenuItem>
          <MenuItem>
            <Link _hover={hoverStyle}>Automation</Link>
          </MenuItem>
          <MenuItem>
            <Link _hover={hoverStyle}>Transactional</Link>
          </MenuItem>
          <MenuItem>
            <Link _hover={hoverStyle}>Contacts</Link>
          </MenuItem>
          <MenuItem>
            <Link _hover={hoverStyle}>Add more apps</Link>
          </MenuItem>
        </MenuList>
      </Menu>

      <HStack gap={6} display={{ base: "none", md: "flex" }}>
        <Link href="/dashboard">
          <Image src={logo} w={9} rounded={"lg"} bg={"white"} p={1} />
        </Link>
        <Link color={"black"} _hover={hoverStyle}>
          Campanhas
        </Link>
        <Link color={"black"} _hover={hoverStyle}>
          Automation
        </Link>
        <Link color={"black"} _hover={hoverStyle}>
          Transactional
        </Link>
        <Link color={"black"} _hover={hoverStyle}>
          Contacts
        </Link>
        <Link color={"black"} _hover={hoverStyle}>
          Add more apps
        </Link>
      </HStack>

      <Spacer />

      <Box>
        <Center gap={5}>
          <Icon _hover={hoverStyle} color={"black"} as={FaBell} mr="2" />

          <Menu>
            <MenuButton
              color={"black"}
              as={IconButton}
              //rightIcon={<ChevronDownIcon />}
              bg="none"
              _hover={{
                bg: "none",
                color: "white",
              }}
              icon={<QuestionIcon />}
            ></MenuButton>
            <MenuList color="black">
              <MenuItem icon={<FaDotCircle />}>Support & tickets</MenuItem>
              <MenuDivider />
              <MenuItem icon={<GrDocumentText />}>Resources</MenuItem>
              <MenuItem icon={<FaRegFileCode />}>API documentation</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              color={"black"}
              rightIcon={<ChevronDownIcon />}
              bg="none"
              _hover={{
                bg: "none",
                color: "black",
              }}
            >
              {account.user?.company_name}
            </MenuButton>

            <MenuList color="black">
              <MenuGroup title={account.user?.name}>
                <MenuItem icon={<FaUser />}>
                  {account && account.user && account.user.company_name && (
                    <span>Perfil {(account.user.company_name.split(" ")[0])}</span>
                  )}
                </MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup  >
                <MenuItem icon={<FaCreditCard />}>My Plan</MenuItem>
                <MenuItem icon={<FaPlug />}>Plugins</MenuItem>
                <MenuItem icon={<FaTelegramPlane />}>Senders & IP</MenuItem>
                <MenuItem icon={<FaWrench />}>SMTP & API</MenuItem>
                <MenuItem icon={<FaUsers />}>Users</MenuItem>
                <MenuItem icon={<IoShieldCheckmark />}>Security</MenuItem>
              </MenuGroup>
              <MenuDivider />

              <MenuGroup>
                <MenuItem icon={<GiWorld />}>Select your language</MenuItem>
                <MenuItem onClick={handleLogout} icon={<MdLogout />}>
                  Log out
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Center>
      </Box>
    </Flex>
  );
};
