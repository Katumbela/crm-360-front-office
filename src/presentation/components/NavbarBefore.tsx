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
              <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Por que o Echo Link 360 ?</MenuItem>
              <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Enterprise</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton className={`${scrolling ? 'text-orange-600' : ''}`}>
              Recursos <ChevronDownIcon />
            </MenuButton>

            <MenuList display="flex" className="bg-white p-3 shadow-lg rounded-md">
              <MenuGroup className="text-orange-600 font-semibold" title="Comunicar">
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Email Marketing</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">API de Email</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Marketing de SMS</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Chat</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Caixa de Entrada</MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup className="text-orange-600 font-semibold" title="Personalizar">
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">CRM de Vendas</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Automação de Marketing</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Emails Transacionais</MenuItem>
              </MenuGroup>

              <MenuDivider />
              <MenuGroup className="text-orange-600 font-semibold" title="Converter">
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Formulários de Inscrição</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Páginas de Destino</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Anúncios no Facebook</MenuItem>
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
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Centro de Ajuda</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Documentação da API</MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup className="text-orange-600 font-semibold" title="Plataforma">
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Casos de Uso</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Laboratório de Serviços</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Sobre a Plataforma</MenuItem>
              </MenuGroup>

              <MenuDivider />
              <MenuGroup className="text-orange-600 font-semibold" title="Parcerias">
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Seja parceiro</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Torne-se um Especialista</MenuItem>
                <MenuItem className="hover:bg-orange-100/40 hover:text-orange-600 px-2 py-[4px] transition-all rounded-md ">Parceiros</MenuItem>
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
              Cadastro grátis
            </NavLink>
          </Box>
        </Center>
      </Flex>

    </Flex>
  );
};
