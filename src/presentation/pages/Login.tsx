import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { BsArrowLeftShort, BsDot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
//import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/spinner";
import { AlertUtils } from "../../utils";
import { handleLoginService } from "../../services";
import { useDispatch } from "react-redux";
import { addAuthStore, removeAuthStore } from "../../store";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/Images/logo-new-2.png'


type FormDataProps = {
  email: string
  password: string
}


export function Login() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  //const [inputUser, setInputUser] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleShowBtn = () => {
    setShow(!show);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  const logout = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    dispatch(removeAuthStore())
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

      localStorage.setItem('user', accountData.id?.toString())
      // console.log(accountData)
      dispatch(addAuthStore(accountData))
      if (
        accountData.name !== ''
      ) {
        AlertUtils.success("Login efetuado com sucesso");
        navigate('/')

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
    <Box className="bg-orange-500  h-screen grid " padding="10">

      <Stack
        spacing={5}
        className="relative bg-white shadow-xl rounded-md py-8 px-12 w-[28rem]"
        m="auto"

      > <NavLink
        className={' absolute top-2 left-2 flex gap-2 px-2 w-[5rem] hover:text-orange-600 hover:rounded-lg py-1 hover:bg-orange-100/40 transition-all'}
        to={'/'}
      >
          <BsArrowLeftShort className="my-auto" />
          Voltar
        </NavLink>
        <NavLink to="/" className={'mt-3'}>
          <Image src={logo} alt="" className="logo w-[8rem]" mx="auto" />
        </NavLink>
        <center><b className="text-primary hover:text-orange-500">Bem vindo de volta !</b></center>
        <form className="bg-white pt-5 pb-3 w-full" onSubmit={handleLogin}>
          <FormControl>
            <FormLabel className="label-sm">Email</FormLabel>
            <Input
              name="email"
              onChange={handleChangeInput}
              type="email"
              className="input-default"
              placeholder="Digite seu e-mail"
            />
          </FormControl>

          <FormControl className="mt-2">
            <FormLabel className="label-sm">Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                className="input-default"
                onChange={handleChangeInput}
                type={show ? "text" : "password"}
                placeholder="Digite a password"
              />
              <InputRightElement>
                <span  className={'mt-1 cursor-pointer me-3 text-orange-600 text-xl'}  onClick={handleShowBtn}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </span>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <button disabled={loading} onClick={handleLogin} className="disabled:bg-slate-300 disabled:text-slate-600 bg-orange-500 font-semibold tracking-widest transition-all hover:bg-orange-400 rounded-md text-white py-2 w-full justify-center flex mt-5">
            {loading && ((<Spinner className="text-slate-700 mt-1 mr-3" />) as any)}
           

            {
              loading ? 'Entrando...' : 'Entrar'
            }
          </button>
        </form>
        <div className="relative my-2 py-3 text-center">
          <span className="bg-white w-[5rem] mx-auto my-auto absolute top-0 left-0 right-0 font-bold text-orange-600">Ou</span>
          <hr />
        </div>

        <Button

          className="border py-2 text-orange-600  rounded-md flex gap-3 font-semibold tracking-wider border-primary"

        >
          <FcGoogle />
          Entrar Google
        </Button>

        <Center p={2} color="black" gap={3}>
          <NavLink
            to="/signup"
className={'link'}
          >
            Criar conta
          </NavLink>
          <BsDot />
          <NavLink to={''} onClick={logout} className={'link'}>
            Esqueceu senha
          </NavLink>
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
