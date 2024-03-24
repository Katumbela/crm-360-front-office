import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowLeftShort, BsCheckCircleFill } from "react-icons/bs";
import logo from "../../assets/Images/logo-new-2.png";
import { UserModel } from "@/domain/models";
import { NavLink } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import bg_s from "../../assets/Images/bg-signup-1.webp";

interface Signup_1Props {
  user: UserModel;
  handleChange: (e: any) => void;
  handlePartNext: () => void;
  handlePartPrev: () => void;
}

export const Signup_1 = ({ user, handleChange, handlePartNext }: Signup_1Props) => {
  const [show, setShow] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  const handleChangePassword = (e: any) => {
    const password = e.target.value;

    // Verifica se a senha atende aos critérios de segurança
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Atualiza os estados
    setIsUpperCase(hasUpperCase);
    setHasNumber(hasNumber);
    setHasSymbol(hasSymbol);

    // Chama a função de handleChange para atualizar o estado da senha
    handleChange(e);
  };


  const handleShowBtn = () => {
    setShow(!show);
  };

  return (
    <Flex h="100vh relative">
      <NavLink
        className={' absolute top-2 left-2 flex gap-2 px-2 w-[5rem] hover:text-orange-600 hover:rounded-lg py-1 hover:bg-orange-100/40 transition-all'}
        to={'/'}
      >
        <BsArrowLeftShort className="my-auto" />
        Voltar
      </NavLink>
      <Box h="100vh" className="grid items-center">

        <Stack w="65%" m="auto" my="15" className="p-6 rounded-lg  bbg-orange-100/30" textAlign="left" spacing={7}>
          <NavLink to="/">
            <Image src={logo} className="logo w-[8rem]"></Image>
          </NavLink>
          <Heading color="green.900" fontSize="3xl">
            <b className="text-orange-600 font-new-rocker text-2xl tracking-widest">Crie sua conta</b> <br />

            <span className="font-truculenta font-extralight">Nenhum <span className="underline">cartão de crédito</span> necessário.
            </span></Heading>
          <Text className="text-sm font-truculenta">
            Envie seus primeiros e-mails e monitoramento em alguns minutos. Já tem uma conta?
            <NavLink
              className={'ms-2 text-orange-600 underline link'}
              to="/login"
            >
              Faça login
            </NavLink>
          </Text>

          <FormControl isRequired>
            <FormLabel className="label-sm">E-mail</FormLabel>
            <Input
              value={user.email}
              name="email"
              className="input-default"
              onChange={handleChange}
              placeholder="E-mail"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel className="label-sm">Senha</FormLabel>
            <InputGroup>
              <Input
                value={user.password}
                onChange={handleChangePassword}
                className="input-default"
                name="password"
                type={show ? "text" : "password"}
                placeholder="Digite a senha"
              />
              <InputRightElement>
                <button className={'mt-1 me-3 text-orange-600 text-xl'} onClick={handleShowBtn}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </button>
              </InputRightElement>
            </InputGroup>
            <br />


            <Tooltip isDisabled={user.email != "" && user.password.length > 8} label={'Preencha os campos obrigatórios'} placement="auto-end" className="bg-orange-400 px-3 py-1 text-white rounded-md">
              <button
                disabled={user.password.length < 8 || user.email == ""}
                onClick={handlePartNext}
                className="w-full py-2 border-2 rounded-md border-primary text-primary"
              >
                Criar uma conta
              </button>
            </Tooltip>
            <br />

            <Flex align="center" gap={3} className='text-sm mt-2 font-extralight'>
              <span className={`${isUpperCase ? "text-green-700" : "text-red-500"}`}>

                {isUpperCase ? <BsCheckCircleFill /> : <FaTimesCircle />}
              </span>
              <Text className={`${isUpperCase ? "text-green-700" : "text-red-500"}`}>{isUpperCase ? "Tem uma letra maiúscula" : "Falta uma letra maiúscula"}</Text>
            </Flex>
            <Flex align="center" gap={3} className='text-sm font-extralight'>
              <span className={`${hasNumber ? "text-green-700" : "text-red-500"}`}>

                {hasNumber ? <BsCheckCircleFill /> : <FaTimesCircle />}
              </span>
              <Text className={`${hasNumber ? "text-green-700" : "text-red-500"}`}>{hasNumber ? "Tem um número" : "Pelo menos um número"}</Text>
            </Flex>
            <Flex align="center" gap={3} className='text-sm font-extralight'>
              <span className={`${hasSymbol ? "text-green-700" : "text-red-500"}`}>

                {hasSymbol ? <BsCheckCircleFill /> : <FaTimesCircle />}

              </span>
              <Text className={`${hasSymbol ? "text-green-700" : "text-red-500"}`}>{hasSymbol ? "Tem um símbolo" : "Falta um símbolo"}</Text>
            </Flex>
          </FormControl>


          {/* 
          <Divider />
          <Text textAlign="center">OU</Text>

          <Button
            fontSize={{ base: "0.9rem", md: "1.1rem" }}
            gap="4"
            bg="white"
            border="1px"
            borderColor="green"
          >
            <Icon as={FcGoogle} />
            Entre com o Google
          </Button>

          <Button
            fontSize={{ base: "0.9rem", md: "1.1rem" }}
            gap="4"
            bg="white"
            border="1px"
            borderColor="green"
          >
            <Icon as={BsApple} />
            Entre com a Apple
          </Button> */}

          <Text className="text-xs mt-2 text-center">
            Ao se inscrever, você está criando uma conta Echo Link 360 e concorda com os{" "}
            <Link className="link " textDecor="underline">
             Termos de uso
            </Link>{" "}
            e{" "}
            <Link className="link me-1" textDecor="underline">
              Política de Privacidade 
            </Link>
             da Echo Link 360
          </Text>
        </Stack>
      </Box>

      <Box>
        <Image
        className="h-screen"
          alt="signup_Image"
          src={bg_s}
        />
      </Box>
    </Flex>
  );
};
