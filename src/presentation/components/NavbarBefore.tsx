import {
  Flex,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  Center,
  Spacer,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/Images/logo-new-2.png'
import { useEffect, useState } from "react";



export const NavbarBefore = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      // border="1px"
      justifyContent="space-around"
      position="sticky"
      top="0"
      zIndex="100"

      className={` ${scrolling ? "bg-orange-100 border-b-2 border-primary shadow-lg" : "bg-orange-100/30"} transition-all py-4 px-5`}
    >
      <Box>
        <Image
          onClick={handleClick}
          w={90}
          ml={20}
          src={logo}
          className="logo"
          alt="logo"
        />
      </Box>

      <Spacer />

      <Flex >
        <Center gap={10}>
          <Menu>
            <MenuButton className={`${scrolling ? 'text-orange-600' : ''}`}>
              Soluções <ChevronDownIcon />
            </MenuButton>
            <MenuList className="bg-white p-2 shadow-lg">
              <MenuItem className="nav-link">Por que o Echo Link 360 ?</MenuItem>
              <MenuItem className="nav-link">Enterprise</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton className={`${scrolling ? 'text-orange-600' : ''}`}>
              Recursos <ChevronDownIcon />
            </MenuButton>

            <MenuList display="flex" className="bg-white p-3 shadow-lg rounded-md">
              <MenuGroup className="text-orange-600 font-semibold" title="Comunicar">
                <MenuItem className="nav-link">Email Marketing</MenuItem>
                <MenuItem className="nav-link">API de Email</MenuItem>
                <MenuItem className="nav-link">Marketing de SMS</MenuItem>
                <MenuItem className="nav-link">Chat</MenuItem>
                <MenuItem className="nav-link">Caixa de Entrada</MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup className="text-orange-600 font-semibold" title="Personalizar">
                <MenuItem className="nav-link">CRM de Vendas</MenuItem>
                <MenuItem className="nav-link">Automação de Marketing</MenuItem>
                <MenuItem className="nav-link">Emails Transacionais</MenuItem>
              </MenuGroup>

              <MenuDivider />
              <MenuGroup className="text-orange-600 font-semibold" title="Converter">
                <MenuItem className="nav-link">Formulários de Inscrição</MenuItem>
                <MenuItem className="nav-link">Páginas de Destino</MenuItem>
                <MenuItem className="nav-link">Monitoramento da internet</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>

          {/* Links para Soluções */}

          <Menu>
            <MenuButton className={`${scrolling ? 'text-orange-600' : ''}`}>
              Soluções <ChevronDownIcon />
            </MenuButton>
            <MenuList display="flex" className="bg-white p-3 shadow-lg rounded-md">
              <MenuGroup className="text-orange-600 font-semibold" title="Aprendizado">
                <MenuItem className="nav-link">Centro de Ajuda</MenuItem>
                <MenuItem className="nav-link">Documentação da API</MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup className="text-orange-600 font-semibold" title="Plataforma">
                <MenuItem className="nav-link">Casos de Uso</MenuItem>
                <MenuItem className="nav-link">Laboratório de Serviços</MenuItem>
                <MenuItem className="nav-link">Sobre a Plataforma</MenuItem>
              </MenuGroup>

              <MenuDivider />
              <MenuGroup className="text-orange-600 font-semibold" title="Parcerias">
                <MenuItem className="nav-link">Seja parceiro</MenuItem>
                <MenuItem className="nav-link">Torne-se um Especialista</MenuItem>
                <MenuItem className="nav-link">Parceiros</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>

          {/* Links para Blog */}

        </Center>
      </Flex>

      <Spacer />

      <Flex mr={0}>
        <Center gap={6}>
          {/* Links de Idioma */}

          <Box>
            <NavLink className={'bg-hover-primary px-6  py-2 text-white border-2 border-primary transition-all'} to="/login">
              Entrar
            </NavLink>
          </Box>

          <Box>
            <NavLink className={'hover-primary px-3 py-2 border-2 border-primary'} to="/signup">
              Registro grátis
            </NavLink>
          </Box>
        </Center>
      </Flex>

    </Flex>
  );
};
