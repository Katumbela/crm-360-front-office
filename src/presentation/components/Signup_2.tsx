import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import logo from "../../assets/Images/logo-new-2.png";
import bg_s from "../../assets/Images/bg-signup-2.webp";
import { UserModel } from "@/domain/models";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface Signup_2Props {
  user: UserModel;
  handleChange: (e: any) => void;
  handlePartNext: () => void;
  handlePartPrev: () => void;
}

export const Signup_2 = ({ user, handleChange, handlePartNext, handlePartPrev }: Signup_2Props) => {
  //const [show, setShow] = useState(false);

  /*
  const handleShowBtn = () => {
    setShow(!show);
  };
  */
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleWebsiteChange = (e: any) => {
    const inputValue = e.target.value;
    const urlPattern = /^https?:\/\/[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*\.[a-zA-Z]{2,}(\/[a-zA-Z0-9\-_]+)*\/?$/;

    // Verifica se o valor inserido corresponde ao padrão de URL
    const isValid = urlPattern.test(inputValue);

    // Atualiza o estado isValidUrl
    setIsValidUrl(isValid);

    // Chama a função handleChange para atualizar o estado do website
    handleChange(e);
  };

  const { company_name, website } = user;

  return (
    <Flex h="100vh">
      <Box w="70%" className="grid items-center" py={10} px={8}>

        <Stack w="65%" m="auto" my="20" className="bg-slate-100/20 rounded-lg shadow-xl border p-20" textAlign="left" spacing={7}>
          <NavLink to="/" className={'mt-3'}>
            <Image src={logo} alt="" className="logo w-[8rem]" />
          </NavLink>
          Í <Heading className="font-new-rocker text-2xl text-orange-600">
            Vamos começar com o básico.
          </Heading>
          <Text className="font-truculenta">
            Primeiro, precisamos saber algumas coisas sobre você.
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap="10">
            <GridItem>
              <FormControl isRequired>
                <FormLabel className="label-sm">Nome</FormLabel>
                <Input className="input-default" placeholder="Nome completo" onChange={handleChange} name="name" type="text" />
                <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired>
                <FormLabel className="label-sm">Nome da empresa</FormLabel>
                <input
                  className="input-default"
                  onChange={handleChange}
                  placeholder="nome da sua empresa"
                  name="company_name"
                  type="text"
                />
                <FormErrorMessage>Nome da empresa é obrigatório.</FormErrorMessage>
              </FormControl>

            </GridItem>

            <GridItem colSpan={2}>

            </GridItem>

            <GridItem colSpan={2}>
              <FormControl isRequired>

                <FormLabel className="label-sm">Website  </FormLabel>
                <Input
                  className="input-default"
                  onChange={handleWebsiteChange}
                  name="website"
                  placeholder="https://echolink360.com"
                  type="url"
                />
                {/* Mostra uma mensagem de erro se o URL não for válido */}
                {!isValidUrl && (
                  <Text className="text-xs text-red-500">
                    O website deve ser um link válido.
                  </Text>
                )}
              </FormControl>

            </GridItem>
          </Grid>

          <div className="flex mt-4 justify-between">

            <Button
              className="rounded-md hover:bg-orange-200 transition-all bg-orange-100 border py-1 px-4 text-orange-600 border-primary"
              disabled={

                company_name == "" ||
                website == ""
              }
              onClick={handlePartPrev}
            >

              <BsArrowLeftShort />
              Anterior
            </Button>
            <button

              className="rounded-md flex disabled:bg-slate-200 disabled:border-slate-400 disabled:text-slate-600 hover:bg-orange-200 transition-all bg-orange-100 border py-1 px-4 text-orange-600 border-primary"
              disabled={
                company_name == "" ||
                website == ""
              }
              onClick={handlePartNext}
            >
              Próximo
              <BsArrowRightShort className="my-auto" />
            </button>

          </div>
        </Stack>
      </Box>

      <Box>
        <Image
          h="100%"
          alt="signup_Image"
          src={bg_s}
        />
      </Box>
    </Flex>
  );
};
