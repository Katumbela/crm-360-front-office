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

export const Dashboard_Statistics = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/email");
  };

  return (
    <Box w="75%" mx="auto">
      <Flex p="4">
        <Heading textAlign="left" fontSize="3xl" color="green.900">
          Statistics
        </Heading>
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
          Create your first template
        </Heading>

        <Text color="gray.700">
          Create and edit your email templates (order confirmations,
          registration confirmations, automation emails etc.).
        </Text>

        <Center>
          <Button borderRadius="50px" maxW="fit-content" colorScheme="red">
            Create my first template
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
