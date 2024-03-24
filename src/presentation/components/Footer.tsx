import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { footerList, logos } from "../../utils"
import logo from '../../assets/Images/logo-new-2.png';

export const Footer = () => {
  const ano = new Date().getFullYear();

  return (
    <Box p={10} className="bg-gray-100/30  border-t-2  pb-2">
      {/* Icons and Logo  */}
      <br />
      <br />
      <Flex
        w="90%"
        m="auto"
        style={{ marginBottom: "2rem" }}
        //  justifyContent="space-between"
        gap={4}
        direction={{ base: "column", md: "row" }}
      >
        <div></div>
        <Spacer />
        <HStack spacing="4">
          {logos.map((item) => (
            <Image cursor="pointer" w={40} key={item.name} src={item.src} />
          ))}
        </HStack>
      </Flex>

      {/* Middle section  */}
      <Flex
        w="90%"
        m="auto"
        my="10"
        gap={8}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          w={{ md: "30%" }}
          gap={8}
          direction={{ base: "column", md: "row" }}
        >
          <Image
            alt="footer image"
            className="w-[6rem] h-[4rem]"
            src={logo}
          />
          <Box textAlign="left">
            <Text color="gray.600" className="text-sm">
            E-mail, SMS, Facebook, bate-papo, CRM e muito mais, plataforma completa para ajudá-lo a expandir seus negócios por meio da construção de relacionamentos mais fortes com os clientes.
            </Text>

            <HStack
              color="red.400"
              cursor="pointer"
              spacing="2"
              mt="3"
              fontWeight="bold"
              _hover={{
                color: "blue.700",
              }}
            >
              <ChevronRightIcon />
              <Text>Porquê a Echo Link 360 ?</Text>
            </HStack>
          </Box>
        </Flex>

        <Spacer />

        <Flex
          w="90%"
          background={"red.500"}
          gap={10}
          direction={{ base: "column", md: "row" }}
        >
          {footerList.map((item, i) => (
            <List key={i} textAlign="left" spacing={2} fontSize="1.1rem">
              <Heading
                color="green.900"
                fontWeight={"bold"}
                fontSize="lg"
                mb={8}
              >
                {item.title}
              </Heading>
              {item.content.map((el, i) => (
                <ListItem
                  cursor="pointer"
                  className="text-sm"
                  color="gray.600"
                  key={i}
                  _hover={{
                    color: "black",
                  }}
                >
                  {el}
                </ListItem>
              ))}
            </List>
          ))}
        </Flex>
      </Flex>

      <br />
      {/* <Image src={logo} className="mx-auto w-[5rem]"/> */}
      {/* BOTTOM SECTION  */}
      <Flex w="70%" className="text-primary" m="auto" mt="5" direction={{ base: "column", md: "row" }}>
        <Text
          color="gray.600"
          display="flex"
          className="text-sm" 
          alignItems="center"
          gap={1}
        >
          <span>&copy;</span>
          {ano} Echo Link 360. All rights reserved
        </Text>
        <Spacer />
        <Text fontSize="sm" className="text-sm" color="gray.600">
          Cookies &middot; Termos de uso
        </Text>
      </Flex>
      <br />
    </Box>
  );
};
