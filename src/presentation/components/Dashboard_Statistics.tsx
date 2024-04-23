import React, { useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import io from "socket.io-client";
import { useAuth } from "../../main/hooks";
import { useSelector } from "react-redux";
import axios from "axios";

export function Dashboard_Statistics() {
  const [qrCode, setQrCode] = useState(""); // Estado para armazenar o QR code recebido
  const [sockett, setSocket] = useState(""); // Estado para armazenar a instância do socket

  const account = useSelector(useAuth());
  const { user } = account;

  // Função para conectar ao servidor de backend via socket.io-client
  const connectToBackend = () => {
    const socket = io("https://crm-webhook-360.onrender.com"); // Substitua "https://seu-backend.com" pelo endereço do seu servidor de backend
    console.log(socket);

    // Lidar com o evento de recebimento do QR code
    socket.on("qrCode", (data) => {
      setQrCode(data.qr); // Armazenar o QR code recebido no estado
    });
  };

  // Efeito para conectar ao backend quando o componente for montado
  useEffect(() => {
    connectToBackend();
  }, []);
  const connect = async () => {
    try {
      const response = await axios.get(
        "https://docker-project-api-wweb.onrender.com/session/start/" + user.id
      );
      console.log(response); // Verifique o conteúdo completo da resposta
      if (
        response.status === 422 &&
        response.data.error === "Session already exists"
      ) {
        alert("Já existe uma sessão para este usuário.");
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
    }
  };

  const qrcode = async () => {
    try {
      const response = await axios.get(
        "https://docker-project-api-wweb.onrender.com/session/qr/" +
          user.id 
          
      );
      console.log(response.data);
      setQrCode(response.data.qr)
    } catch (error) {
      console.error("Erro ao conectar:", error);
    }
  };

  return (
    <div className="ps-32">
      {" "}
      <Box>
        <Heading size="md">Conectar WhatsApp</Heading>
        <Button onClick={connect} colorScheme="blue">
          Conectar
        </Button>
        <Button onClick={qrcode} colorScheme="blue">
          QR code
        </Button>

        {/* Exibir o QR code se estiver disponível */}
        {qrCode && (
          <Box>
            <Heading size="md">Escanei para conectar seu whatsapp com QR Code</Heading>
            <QRCode value={qrCode} />
          </Box>
        )}
      </Box>
    </div>
  );
}
