import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTelegramPlane } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { AlertUtils } from "../../utils";
import { useAuth } from "../../main/hooks";
import { useSelector } from "react-redux";
import { Spinner } from "./spinner";
import { fetchReclamacoes, ReclamacaoData } from "../../services/getReclamacoes";
import { sendEmail } from "../../utils/send-notification-email";
import { BiSave } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";


export const Dashboard_Templates = () => {
  const account = useSelector(useAuth());
  const { user } = account;

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [reclamacoes, setReclamacoes] = useState<ReclamacaoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReclamacao, setSelectedReclamacao] = useState<ReclamacaoData | null>(null);
  const [response, setResponse] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedReclamacoes = await fetchReclamacoes(user);
      setReclamacoes(fetchedReclamacoes || []);
    } catch (error) {
      console.error("Erro ao buscar reclamações:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResponseSubmit = async () => {
    if (selectedReclamacao) {
      // Lógica para registrar a resposta
      const { emailCliente } = selectedReclamacao;
      setLoading2(true)
      if (!isPublic) {
        const dadosResp = {
          to: emailCliente,
          subject: "Resposta à sua reclamação",
          body: response
        }
        setLoading2(false)
        await sendEmail(dadosResp);
      }
      // Exibir alerta ou notificação de sucesso
      AlertUtils.success("Resposta enviada com sucesso!");
      setLoading2(false)
      setResponse("");
      onClose();
    }
  };

  const filteredReclamacoes = reclamacoes.filter(reclamacao =>
    reclamacao.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamacao.emailCliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box w="75%" mx="auto" p={5}>
      
      <br />
      <br />

     
      <FormControl mb={4}>
        <Input
          placeholder="Pesquisar por nome ou email"
          value={searchTerm}
          className="w-full px-3 py-2 mb-8 border-2 rounded-sm outline-none focus-within:border-orange-500 text-md"
          onChange={handleSearch}
        />
      </FormControl>

      {loading ? (
        <Spinner className="mx-auto mt-8 text-5xl text-orange-500" />
      ) : (
        <>
          {filteredReclamacoes.length <= 0 ? (
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
                Nenhuma reclamação encontrada
              </Heading>
              <Text color="gray.700">
                Não há reclamações para exibir. Adicione novas reclamações!
              </Text>
              <Center>
                <Button borderRadius="50px" maxW="fit-content" colorScheme="red">
                  Adicionar Reclamação
                </Button>
              </Center>
            </Stack>
          ) : (
            <Stack spacing={4}>
              {filteredReclamacoes.map((reclamacao) => (
                <Box
                  key={reclamacao.timestamp}
                  className="p-5 bg-white border border-gray-200 rounded-md shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold">{reclamacao.cliente}</h2>
                    <span>|</span>
                    <span className="text-xs text-slate-500">{reclamacao.emailCliente}</span>
                  </div>
                  <span
                    className={`mt-1 text-xs ${reclamacao.status === "nao-respondido" ? "text-red-500" : "text-green-500"}`}
                  >
                    {reclamacao.status === "nao-respondido" ? "Não Respondido" : "Respondido"}
                  </span>
                  <br />
                  <span className="flex gap-2 font-extralight"><FaStar className="my-auto text-orange-500" />  {reclamacao.classificacao.toFixed(1)}</span>
                  <p className="mt-1 text-xs text-slate-500">{reclamacao.quando}</p>
                  <p className="mt-3 text-sm text-black">{reclamacao.historia}</p>
                  <button
                    className="px-3 py-1 mt-4 text-xs text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none"
                    onClick={() => {
                      setSelectedReclamacao(reclamacao);
                      onOpen();
                    }}
                  >
                    Responder
                  </button>
                </Box>

              ))}
            </Stack>
          )}
        </>
      )}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="bg-black/40" />
        <ModalContent w={'30rem'} mx={'auto'} className="bg-white w-[20vw] p-8 rounded-xl my-auto mt-[25vh]">
          <ModalHeader className="mb-6 text-xl font-bold">Responder <span className="text-orange-500 underline"> {selectedReclamacao?.cliente.split(' ')[0]}</span></ModalHeader>
          <ModalCloseButton className="absolute top-4 right-4" />

          <ModalBody>
            <FormControl>
              <Input
                placeholder="Digite sua resposta aqui..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <br />
              <br />
              <Flex mt={4}>
                <FormControl display="flex" alignItems="center">
                  <Input
                    type="checkbox"
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                  />
                  <Text ml={2}>Responder publicamente</Text>
                </FormControl>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button disabled={response == ''} className="flex gap-2 px-3 py-2 text-sm text-white transition-all bg-orange-500 rounded-lg disabled:bg-slate-300 disabled:text-slate-700 hover:bg-orange-600" colorScheme="blue" onClick={handleResponseSubmit}>
              {
                loading2 ?
                  <Spinner className="mx-4 my-1 animate-spin" />
                  :
                  <span className="flex gap-3">
                    Responder <BiSave className="my-auto" />
                  </span>
              }
            </Button>
            <Button ml={3} className="px-3 py-2 text-sm text-white bg-red-500 rounded-lg" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
