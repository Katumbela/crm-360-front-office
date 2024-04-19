// Front-end

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
import { FaSpinner, FaWhatsapp } from "react-icons/fa";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useAuth } from "../../main/hooks";
import QRCode from "qrcode.react";
import io from "socket.io-client";

type MessageType = {
  id: string; // ID da mensagem
  body: string; // Corpo da mensagem
  from: string; // Remetente da mensagem
  number: string; // Número do contato
  name: string; // Nome do contato
  pushName: string; // Push Name do contato
  isMe: boolean; // Se a mensagem foi enviada pelo próprio usuário
  isUser: boolean; // Se o remetente é um usuário
  isGroup: boolean; // Se a mensagem foi enviada em um grupo
  isWAContact: boolean; // Se o remetente é um contato do WhatsApp
  isBusiness?: boolean; // Se é um Business Contact
  // Outras propriedades específicas de Business Contact, se necessário
  // Adicione outras propriedades da mensagem, se necessário
};

type ChatType = {
  id: string;
  name: string;
};

//const socket = io("https://whatsapp-socket-api.onrender.com");

export function Dashboard_Statistics() {
  const [qrCode, setQrCode] = useState("");
  const [load, SetLoad] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]); // Para armazenar as mensagens recebidas
  const [chats, setChats] = useState<ChatType[]>([]); // Para armazenar os chats disponíveis
  //const socket = io("http://localhost:3001");

  const socket = io("https://whatsapp-socket-api.onrender.com");

  const [whatsappConnected, setWhatsappConnected] = useState(false);

  const account = useSelector(useAuth());
  const { user } = account;

  const handleConnectWhatsApp = () => {
    try {
      socket.emit("connectWhatsApp", user.id);
      SetLoad(true);
      console.log("Conectando ao WhatsApp...");
    } catch (error) {
      console.error("Erro ao conectar o WhatsApp:", error);
    }
  };

  const handleChatClick = (chatId: string) => {
    // Enviar uma solicitação ao servidor para abrir o chat com o ID especificado
    socket.emit("openChat", { userId: user.id, chatId });
  };

  useEffect(() => {
    socket.on("qrCode", (qrCodeData) => {
      setQrCode(qrCodeData.qr);
      console.log(qrCodeData.qr);
    });
    socket.on("auth", (datas) => {
      console.log(datas);
      setWhatsappConnected(true);
    });

    socket.on("whatsappConnected", ({ userId }) => {
      console.log(`WhatsApp conectado para o usuário ${userId}`);
      SetLoad(false);
      setWhatsappConnected(true);
    });

    socket.on("allMessages", (messageList) => {
      // Atualiza a lista de mensagens com as mensagens recebidas
      setMessages(messageList);
    });

    socket.on("allChats", (chatList) => {
      // Atualiza a lista de chats com os chats disponíveis
      setChats(chatList);
    });
  }, []);

  /*
  useMemo(() => {
    handleConnectWhatsApp();
  }, [user.id]);
*/
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
        <Center>
          <Button borderRadius="50px" maxW="fit-content" colorScheme="red">
            <div>
              {load ? (
                <p>
                  <FaSpinner className="animate animate-spin" />
                </p>
              ) : (
                <p></p>
              )}
            </div>{" "}
            <div>
              {whatsappConnected ? (
                <p>WhatsApp conectado com sucesso!</p>
              ) : (
                <>
                  {qrCode != "" && (
                    <QRCode
                      value={qrCode}
                      size={256}
                      level={"H"}
                      includeMargin={true}
                    />
                  )}

                  <Text color="gray.700">
                    Conecte sua conta à Echo Link 360
                  </Text>
                </>
              )}
            </div>
          </Button>
        </Center>
      </Stack>

      {/* Exibindo a lista de chats disponíveis */}
      <Box>
        <Heading size="md">Chats Disponíveis:</Heading>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} onClick={() => handleChatClick(chat.id)}>
              {chat.name}{" "}
              {/* Exemplo de como você pode exibir o nome do chat */}
            </li>
          ))}
        </ul>
      </Box>

      {/* Exibindo as mensagens recebidas */}
      <Box>
        <Heading size="md">Mensagens Recebidas:</Heading>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.body}</li> // Supondo que 'body' contenha o texto da mensagem
          ))}
        </ul>
      </Box>

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
