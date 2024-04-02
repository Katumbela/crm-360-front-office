import { ChevronDownIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
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
  FaWrench,
  FaCreditCard,
  FaRegFileCode,
  FaDotCircle,
  FaBell,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoShieldCheckmark } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo-new-2.png";
import { useSelector } from "react-redux";
import { useAuth } from "../../main/hooks";
import { useDispatch } from "react-redux";
import { removeAuthStore } from "../../store";
import { NavLink } from "react-router-dom";
import { notification } from "../../dummy/notification-datas";

export const NavbarAfter = () => {
  // const navigate = useNavigate();
  const account = useSelector(useAuth())
  // const { user } = account
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(removeAuthStore())
    window.location.href = "/";
  };

  return (
    <Flex

      justifyContent="space-around flex"
      className="bg-orange-100 border-orange-500 hover:border-none border-b-2 fixed top-0 right-0 left-0 z-50 py-2 px-8"
    >
      <Menu>

        <div className="sm:hidden">
          <MenuButton
            as={IconButton}
            className="text-3xl  text-orange-600"
            icon={<GiHamburgerMenu />}
          >
          </MenuButton>
        </div>
        <MenuList flexDirection="column" gap="5">
          <MenuItem>
            <Link >Campanhas </Link>
          </MenuItem>
          <MenuItem>
            <Link >Automation</Link>
          </MenuItem>
          <MenuItem>
            <Link >Transactional</Link>
          </MenuItem>
          <MenuItem>
            <Link >Contacts</Link>
          </MenuItem>
          <MenuItem>
            <Link >Add more apps</Link>
          </MenuItem>
        </MenuList>
      </Menu>

      <div className="sm:flex hidden">
        <HStack className=" ">
          <NavLink to="/">
            <Image src={logo} className="w-[7rem]" />
          </NavLink>
          <NavLink className={' ms-12 nav-after-link'} to="/" color={"black"} >
            Campanhas
          </NavLink>
          <NavLink  className={' nav-after-link'} to={'/'}>
            Automação
          </NavLink>
          <NavLink className={' nav-after-link'}  to="/internet/monitoring" color={"black"} >
            Monitoramento
          </NavLink>
          <NavLink className={' nav-after-link'}  to="/" color={"black"} >
            Contactos
          </NavLink>
          {/* <Link color={"black"} >
          Add more apps
        </Link> */}
        </HStack>

      </div>

      <Spacer />

      <Box className="my-auto">
        <Center gap={25} className="">
          <Menu>
            <MenuButton
              className="text-blue-600"
              as={IconButton}
              //rightIcon={<ChevronDownIcon />}

              icon={<FaBell />}
            ></MenuButton>

            <MenuList className="bg-white max-w-[20rem] py-2 px-4 shadow-lg text-md">
              <MenuItem icon={<FaDotCircle className="text-green-400" />}> <span className="text-orange-600 font-bold">Suas notificações </span> </MenuItem>
              <MenuDivider />
              {
                notification.map((notification) => (

                  <MenuItem key={notification.id} className="font-extralight  text-sm pt-2">
                    <div className="p-1 bg-slate-100 rounded-md">
                      <b>{notification.title}</b>
                      <p>{notification.desc}</p>
                    </div>
                  </MenuItem>

                ))
              }

            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              className="text-blue-600"
              as={IconButton}
              //rightIcon={<ChevronDownIcon />}

              icon={<QuestionIcon />}
            ></MenuButton>

            <MenuList className="bg-white px-3 py-2 shadow-xl ">
              <MenuItem icon={<FaDotCircle className="text-green-400" />}> <span className="text-orange-600 font-bold">Suporte </span> </MenuItem>
              <MenuDivider />
              <MenuItem className="mt-3 nav-link" icon={<GrDocumentText />}>Centro de ajuda</MenuItem>
              <MenuItem className=" nav-link" icon={<FaRegFileCode />}>documentação da API </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton

              className="bg-orange-300 py-2 px-4 border border-orange-500 rounded-md font-semibold"
            >
              {account.user.company_name} <ChevronDownIcon />
            </MenuButton>

            <MenuList className="bg-white px-3 py-2 rounded-md shadow-xl ">
              <MenuGroup className="font-semibold text-orange-800 mb-2" title={account.user?.name}>
                <MenuItem className="mb-3" icon={<FaUser />}>
                  {account && account.user && account.user.company_name && (
                    <span className="font-bold  text-orange-600"> {(account.user.company_name.split(" ")[0])}</span>
                  )}
                </MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup  >
                <MenuItem className="nav-link" icon={<FaCreditCard />}>Plano <span className="font-bold">{account.user.plan}</span></MenuItem>
                <MenuItem className="nav-link" icon={<FaTelegramPlane />}>Seus emails</MenuItem>
                <MenuItem className="nav-link" icon={<FaWrench />}>SMTP & API</MenuItem>
                <MenuItem className="nav-link" icon={<FaUsers />}>Usuários</MenuItem>
                <MenuItem className="nav-link" icon={<IoShieldCheckmark />}>Segurança</MenuItem>
              </MenuGroup>
              <MenuDivider />

              <MenuGroup>
                {/* <MenuItem icon={<GiWorld />}>Select your language</MenuItem> */}
                <MenuItem className="bg-red-300/40 rounded-md border border-red-500 hover:bg-red-400 transition-all gap-2 text-red-700 mt-2 flex justify-center" onClick={handleLogout}>
                  <span>Sair</span> <MdLogout />
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Center>
      </Box>
    </Flex >
  );
};
