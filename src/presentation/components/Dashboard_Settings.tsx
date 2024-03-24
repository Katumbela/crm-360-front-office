import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTelegramPlane } from "react-icons/fa";

import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const Dashboard_Settings = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/email");
  };

  return (
    <Box w="75%" mx="auto">
      <Flex p="4">
        
        <Spacer />
        <Button onClick={handleClick} colorScheme="red">
          New Template
        </Button>
      </Flex>

      <Divider />

      <Stack
        mt="20px"
        bg="#F9FAFC"
        padding="10"
        spacing={10}
        border="1px"
        borderStyle="dashed"
        borderColor="gray.500"
        textAlign="center"
        w="60%"
        mx="auto"
        my="20"
      >
        <Heading
  fontSize="2xl"
  display="flex"
  alignItems="center"
  justifyContent="center"
  gap="2"
  fontWeight="500"
>
  <Icon as={FaTelegramPlane} />
  Crie seu primeiro modelo
</Heading>

<Text color="gray.700">
  Crie e edite seus modelos de e-mail (confirmações de pedidos,
  confirmações de registro, e-mails de automação etc.).
</Text>

<Center>
  <Button borderRadius="50px" maxW="fit-content" colorScheme="red">
    Criar meu primeiro modelo
  </Button>
</Center>

      </Stack>

      <Button
        bg="green.900"
        borderRadius="50px"
        color="white"
        gap="2"
        position="sticky"
        top="96%"
        bottom="10px"
        left="90%"
        right="10px"
        padding="5"
        _hover={{ bg: "green.900" }}
      >
        <QuestionOutlineIcon />
        Support
      </Button>
    </Box>
  );
};
