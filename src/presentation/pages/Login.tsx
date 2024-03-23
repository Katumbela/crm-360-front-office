import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
//import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/spinner";
import { AlertUtils } from "../../utils";
import { handleLoginService } from "../../services";
import { useSelector } from "react-redux";
import { useAuth } from "../../main/hooks";
import { useDispatch } from "react-redux";
import { addAuthStore } from "../../store";



type FormDataProps = {
  email: string
  password: string
}


export function Login() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  //const [inputUser, setInputUser] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps)
  const user = useSelector(useAuth());
  const dispatch = useDispatch()
  //const navigate = useNavigate();

  const handleShowBtn = () => {
    setShow(!show);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log({ formData });

    if (!formData.email?.trim() && !formData.password?.trim()) {
      return AlertUtils.error("Informe as credenciais");
    }
    if (!formData.email?.trim()) {
      return AlertUtils.error("Informe o email ");
    }
    if (!formData.password?.trim()) {
      return AlertUtils.error("Informe a senha");
    }
    setLoading(true);
    try {
      const accountData = await handleLoginService(formData);

      console.log(accountData)
      dispatch(addAuthStore(accountData))
      localStorage.setItem('user', accountData.id?.toString())
      if (
        accountData.name !== ''
      ) {
        AlertUtils.success("Login efetuado com sucesso");

      }
      else {
        AlertUtils.error("Credenciais de acesso inválidas");

      }
    } catch (error) {
      AlertUtils.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="#00FF99" padding="10">
      <Stack
        spacing={5}
        w={["90%", "50%", "30%"]}
        shadow={"lg"}
        m="auto"
        bg="white"
        p={10}
      >
        <Link href="/">
          <Image src={"assets/images"} alt="" className="logo" mx="auto" />
        </Link>
        <form className="bg-white py-9 px-16 w-[30vw]" onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              onChange={handleChangeInput}
              type="email"
              placeholder="Enter Email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                onChange={handleChangeInput}
                type={show ? "text" : "password"}
                placeholder="Enter Password"
              />
              <InputRightElement>
                <Button onClick={handleShowBtn}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button onClick={handleLogin} colorScheme="green">
            {loading && ((<Spinner />) as any)}
            isLoading={loading}
            Log in
          </Button>
        </form>
        <Divider />
        <Text>OR</Text>

        <Button
          fontSize={{ base: "0.9rem", md: "1.1rem" }}
          gap="4"
          bg="white"
          border="1px"
          borderColor="green"
        >
          {user.user?.name}
          <FcGoogle />
          Sign in with Google
        </Button>

        <Center p={2} color="black" gap={3}>
          <Link
            href="/signup"
            _hover={{ color: "red", textDecoration: "underline" }}
          >
            Criar conta
          </Link>
          <BsDot />
          <Link _hover={{ color: "red.400", textDecoration: "underline" }}>
            Esqueceu senha
          </Link>
        </Center>
        {/*
        <Button fontSize={{ base: "0.9rem", md: "1.1rem" }} gap="4" bg="white" border="1px" borderColor="green">
          <BsApple />
          Sign in with Apple
        </Button>
          */}
      </Stack>
    </Box>
  );
}
