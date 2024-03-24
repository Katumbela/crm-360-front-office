import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
//import { authContext } from "../context/AuthContext";
import logo from "../../assets/Images/logo-new-2.png";
import { UserModel } from "@/domain/models";
import { AlertUtils } from "../../utils";
import bg_s from "../../assets/Images/bg-signup-2.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Spinner } from "./spinner";
import { handleSignupService } from "../../services/signUpServices";
import { useDispatch } from "react-redux";
import { addAuthStore } from "../../store";

interface Signup_4Props {
  user: UserModel;
  handleChange: (e: any) => void;
  handlePartPrev: (e: any) => void;
}

export const Signup_4 = ({ user, handleChange, handlePartPrev }: Signup_4Props) => {
  // const navigate = useNavigate();
  const [selling, setSelling] = useState("no");
  const [showError, setShowError] = useState(false);
  const { team, contacts } = user;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const  handleSubmit = async () => {
    setLoading(true)
    try {
      const accountData = await handleSignupService(user);

      localStorage.setItem('user', accountData.id?.toString())
      // console.log(accountData)
      dispatch(addAuthStore(accountData))
      if (
        accountData.name !== ''
      ) {
        AlertUtils.success("Conta configurada com sucesso");
        navigate('/')

      }
      else {
        setShowError(true)
        // AlertUtils.error("Já existe uma conta com seu email");
        setTimeout(() => {
          setShowError(false)
        }, 5000);

      }
    } catch (error) {
      AlertUtils.error(error as string);
    } finally {
      setLoading(false);
    }
      // navigate('/success')
   
    // navigate("/");
    // handleSignup(user);
  };

  const setOnlineSelling = (e: any) => {
    user.online_selling = e;
    // console.log(user.online_selling)
    setSelling(e);
  };

  return (
    <Flex h="100vh" overflowY="auto">
      <Box w="70%" className="grid items-center" py={10} px={8}>

        <Stack w="65%" className="" m="auto" my="20" textAlign="left" spacing={7}>
          <NavLink to="/" className={'mt-3'}>
            <Image src={logo} alt="" className="logo w-[8rem]" />
          </NavLink>
          <button
            className={' absolute top-2 left-2 flex gap-2 px-2 w-[5rem] hover:text-orange-600 hover:rounded-lg py-1 hover:bg-orange-100/40 transition-all'}
            onClick={handlePartPrev}
          >
            <BsArrowLeftShort className="my-auto" />
            Voltar
          </button>
          <span className=""> <ArrowBackIcon onClick={() => handlePartPrev} /> Anterior</span>

          <Button w="fit-content" className='text-3xl text-orange-600 font-new-rocker' gap={2} color="red.400" bg="white">
            Detalhes da empresa
          </Button>

          <Heading color="green.900" className="text-sm font-truculenta" fontSize="3xl">
            Conte-nos mais sobre o seu negócio
          </Heading>
          <Text className="text-sm font-truculenta" color="gray.600">
            Isso nos permitirá entender melhor as necessidades do seu negócio.
          </Text>
          <span>
            Plano: <b className="font-new-rocker text-orange-500">Free</b>
          </span>
          <Grid templateColumns="repeat(2, 1fr)" gap="10">
            <GridItem>
              <FormControl isRequired>
                <FormLabel className="label-sm">Quantas pessoas há na sua equipe?</FormLabel>
                <select
                  className="input-default"
                  name="team"
                  onChange={handleChange}

                >
                  <option value="">Selecione</option>
                  <option value="0-1 funcionário">0-1 funcionário</option>
                  <option value="2-10 funcionários">2-10 funcionários</option>
                  <option value="11-50 funcionários">11-50 funcionários</option>
                  <option value="51-250 funcionários">51-250 funcionários</option>
                  <option value="> 250 funcionários">{"> 250 funcionários"}</option>
                </select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired>
                <FormLabel className="label-sm">Quantos contatos você possui?</FormLabel>
                <select
                  className="input-default"
                  name="contacts"
                  onChange={handleChange}

                >
                  <option value="">Selecione</option>
                  <option value="1-300">1-300</option>
                  <option value="301-2k">301-2k</option>
                  <option value="2001-5k">2001-5k</option>
                  <option value="5k-20k">5k-20k</option>
                  <option value="20k-100k">20k-100k</option>
                  <option value="Mais de 100k">Mais de 100k</option>
                  <option value="Ainda não há contatos">Ainda não há contatos</option>
                </select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl className="mt-4">
                <FormLabel className="label-sm">Você vende online?</FormLabel>
                <RadioGroup
                  name="online_selling"
                  onChange={setOnlineSelling}
                  value={selling}
                >
                  <Stack spacing={30} direction="row">
                    <Radio className={`border h-5 w-5 ${selling == 'yes' ? 'bg-green-500 border-green-500 border-2 rounded-md ' : ' border-primary '}`} value="yes">sim</Radio>
                    <Radio className={`border h-5 w-5 ${selling == 'no' ? 'bg-orange-500 border-orange-500 border-2 rounded-md ' : ' border-primary '}`} value="no">não</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </GridItem>
          </Grid>
          {showError &&( <>
          <div className=" bg-red-200/50 tracking-widest text-sm px-2 py-1 rounded-md shadow-md mb-1 text-red-700">
          {user.name.split(" ")[0]} , Já existe uma conta com seu email , faça <NavLink className={'underline'} to={'/login'}>Login</NavLink>, ou recupere sua senha
          </div>
          </>)}
          <button
            className="bg-orange-600 mt-3 flex justify-center gap-4 disabled:bg-slate-300 disabled:text-slate-700 hover:bg-orange-500 transition-all py-2 rounded-md text-white font-bold tracking-widest"
            disabled={team == "" || contacts == "" || loading}
            onClick={handleSubmit}
          >
            {loading && ((<Spinner className="text-slate-700 mt-1 " />) as any)}

            {
              loading ? 'cadastrando...' : 'Finalizar cadastro'
            }
          </button>
        </Stack>
      </Box>

      <Box>
        <Image
          h="100%"
          alt="Imagem de inscrição"
          src={bg_s}
        />
      </Box>
    </Flex>

  );
};
