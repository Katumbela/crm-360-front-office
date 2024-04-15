import React, { useEffect, useState } from "react";
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
import { FaWhatsapp } from "react-icons/fa";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useAuth } from "../../main/hooks";
import QRCode from "qrcode.react";
import io from "socket.io-client";

export function Dashboard_Statistics() {
  const [qrCode, setQrCode] = useState("");
  const socket = io("http://localhost:3001");

  const account = useSelector(useAuth());
  const { user } = account;

  const handleConnectWhatsApp = () => {
    try {
      socket.emit("connectWhatsApp", user.id);
      console.log("Conectando ao WhatsApp...");
    } catch (error) {
      console.error("Erro ao conectar o WhatsApp:", error);
    }
  };

  useEffect(() => {
    socket.on("qrCode", (qrCodeData) => {
      setQrCode(qrCodeData.qr);
      console.log(qrCodeData.qr);
    });

    return () => {
      socket.off("qrCode"); // Remover o ouvinte quando o componente for desmontado
    };
  }, []);

  return (
    <Box w="75%" mx="auto">
      <Flex p="4">
        <Spacer />
        <Button onClick={handleConnectWhatsApp} colorScheme="red">
          Conectar WhatsApp
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
          <Icon as={FaWhatsapp} className="text-5xl text-green-600" /> <br />
        </Heading>

        {qrCode && (
          <QRCode
            value={qrCode}
            size={256}
            level={"H"}
            includeMargin={true}
          />
        )}

        <Text color="gray.700">
          Conecte sua conta para começar a enviar e receber mensagens a partir
          da Echo Link 360
        </Text>

        <Center>
          <Button borderRadius="50px" maxW="fit-content" colorScheme="red">
            Aguardando!
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
        Suporte
      </Button>
    </Box>
  );
}
