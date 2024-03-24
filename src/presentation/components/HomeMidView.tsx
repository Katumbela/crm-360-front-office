import {
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HomeSection } from "./HomeSection";
import img from '../../assets/Images/hero6.svg'

export const HomeMidView = () => {
  return (
    <Container bg="blue.500" className="" maxW="100vw" mt="300px" p={100}>
      <div
        className="flex gap-16"
      >
        <Image src={img} className="w-[20rem]" />
        <VStack align="flex-start" className="my-auto" textAlign="start" spacing={8}>
          <Heading fontSize="5xl" className="text-3xl font-bold text-orange-600" color="green.900">
            Liderando o caminho do Marketing Digital

          </Heading>
          <Text lineHeight={2} color="gray.600">
            Nomeada uma das 100 maiores empresas de software de 2024 e classificada como a melhor plataforma de automação de marketing para pequenas e médias empresas. Expanda seus negócios com o <b>Echo Link 360</b>
          </Text>

          <button className="bg-orange-600 mt-5 py-3 px-6 text-xl text-white" >
            Comece gratuitamente
          </button>
        </VStack>
      </div>

      <br />
      <br />
      <br />

      <VStack>

        <Heading fontSize="5xl" className="font-bold text-4xl text-orange-600 font-bahiana" color="green.900">
          Faça o com a Echo Link 360{" "}
        </Heading>
        <Text fontSize="xl" className="text-2xl font-light text-gray-500" color="gray.500">
          Todas as ferramentas que você precisa e algumas novas para experimentar

        </Text>
      </VStack>
      
      <HomeSection />
    </Container>
  );
};
