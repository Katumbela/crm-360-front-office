import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Feature } from "../components/Feature";
import { Footer } from "../components/Footer";
import { HomeMidView } from "../components/HomeMidView";
import { NavbarBefore } from "../components/NavbarBefore";
import home_image from "../../assets/Images/hero-1.svg";
import hero6 from "../../assets/Images/hero-6.svg";
import { prices } from "../../dummy/pricing-list-datas";
import PricingBox from "../components/pricing-component";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import { useState } from "react";

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <NavbarBefore />
      <Flex m="auto" mt="70px" width="80%">
        <Stack width="70%" className="my-auto" spacing={5}>
          <h1 className="text-5xl text-primary font-new-rocker">
            Prepare-se para a decolagem.
          </h1>
          <Text
            align="left"
            fontSize="xl"
            pl="9"
            pr="9"
            borderLeft="2px"
            borderColor="#FFD201"
          >
            O Echo Link 360 é a plataforma mais inteligente e intuitiva para negócios
            em crescimento. Prospere digitalmente enquanto orientamos seu
            negócio com as ferramentas certas de marketing e vendas.
          </Text>

          <Button
            onClick={() => window.location.href = "signup"}
            maxWidth="fit-content"
            className="relative flex px-5 py-3 mt-6 font-bold text-white bg-primary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Teste gratuitamente
            <BsArrowRightShort
              className={`my-auto text-2xl transition-transform duration-300 ${isHovered ? 'transform translate-x-2' : ''
                }`}
            />
          </Button>
        </Stack>
        <Box width="60%">
          <Image opacity={1} alt="Home Image" src={home_image} />
        </Box>
      </Flex>

      <Flex
        w="80%"
        padding="40px"
        className="mx-auto mt-20 border-2 rounded-lg section_2 bg-secondary-opacity border-primary"
        gap={18}
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Feature
          src="https://www.sendinblue.com/wp-content/uploads/2021/08/icn-ftr-1b.svg"
          title="Escolha suas ferramentas"
          desc="Nós ajudaremos você a alcançar as pessoas certas e produzir o conteúdo certo."
        />

        <Feature
          src="https://www.sendinblue.com/wp-content/uploads/2021/08/icn-ftr-2b.svg"
          title="Trabalhe de forma inteligente, não dura"
          desc="Concentre-se nas tarefas importantes e coloque o restante no piloto automático com automação."
        />

        <Feature
          src="https://www.sendinblue.com/wp-content/uploads/2021/08/icn-ftr-3b.svg"
          title="Estamos aqui para você"
          desc="Estaremos aqui 24 horas por dia para ajudá-lo com qualquer dúvida."
        />
      </Flex>

      {/* Home Middle view component appended */}

      <HomeMidView />

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        w="full"
        backgroundColor="gray.200"
      >
        <Stack
          spacing={5}
          marginY={5}
          justifyContent="flex-start"
          alignItems="center"
          maxWidth="1200px"
          w="full"
          paddingX={[5, 0]}
        >
          <VStack alignItems="center" w="full">
            <Heading className="text-3xl text-orange-600 font-new-rocker md:text-5xl xxl:text-6xl ">Planos e Preços</Heading>
            <Text className="mb-5 font-bahiana" textAlign="center">
              Escolha o plano perfeito para alavancar o seu negócio, empresa ou startup com a <b className="text-orange-600 font-new-rocker">Echo Link 360</b>
            </Text>
          </VStack>
          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList className="gap-4 mb-5 ms-3">
              <Tab className={` bg-orange-200 cursor-pointer focus:bg-orange-500 focus:text-white text-orange-700 py-1 px-3 rounded-lg`}>Mensal</Tab>
              <Tab className={` bg-orange-200 cursor-pointer focus:bg-orange-500 focus:text-white text-orange-700 py-1 px-3 rounded-lg`}>Anual</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="flex w-full">
                  {prices.map((price) => (
                    <PricingBox key={price.name} {...price} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex w-full">
                  {prices.map((price) => (
                    <PricingBox
                      key={price.name}
                      {...price}
                      price={price.price * 12 * 0.8}
                    />
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Flex>

      <div className="flex w-[80%] mx-auto gap-4">
        <img src={hero6} alt="" className="w-6/12" />
        <div className="w-6/12 my-auto">
          <h2 className="text-4xl font-bold text-orange-600 ">Análise & Monitoramento</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos perspiciatis esse corrupti obcaecati iste possimus, autem expedita dignissimos distinctio sequi officia, volupt
          </p>

          <button onClick={() => window.location.href = "signup"} className="flex gap-3 px-6 py-3 mt-5 text-xl font-bold text-orange-700 transition-all border-2 bg-secondary-opacity hover:bg-orange-600 hover:text-white border-primary" >
            Comece gratuitamente
            <BsArrowRight className="my-auto" />
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Flex w="70%" margin="auto">


        <Stack padding={10} className="my-auto" textAlign="left">
          <Heading fontSize="5xl" color="green.900">
            A privacidade e a segurança dos seus dados são uma das principais preocupações para nós.          </Heading>
          <HStack spacing={10}>
            <Image
              boxSize="100px"
              src="https://www.sendinblue.com/wp-content/uploads/2021/08/CSA@1x.svg"
            />
            <Image
              boxSize="100px"
              src="https://www.sendinblue.com/wp-content/uploads/2021/08/signal-spam-grey.svg"
            />
            <Image
              boxSize="100px"
              src="https://www.sendinblue.com/wp-content/uploads/2021/08/sncd.svg"
            />
          </HStack>
          <HStack
            color="red.400"
            cursor="pointer"
            spacing="2"
            fontWeight="bold"
            _hover={{
              color: "blue.700",
            }}
          >
            <ChevronRightIcon />
            <Text>Saiba mais sobre a conformidade de segurança</Text>
          </HStack>
        </Stack>

        <Image
          boxSize="300px"
          alt="image"
          src="https://www.sendinblue.com/wp-content/themes/sendinblue2019/assets/images/common/shield.jpg"
        />
      </Flex>


      <br />
      {/* Bottom section is remaining */}
      <Footer />
    </div>
  );
}

