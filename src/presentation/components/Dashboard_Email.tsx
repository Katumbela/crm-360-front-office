import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmailsModelProps } from "@/domain/models/";

const getEmails = () => {
  return fetch(`http://localhost:8080/emails`).then((res) => res.json());
};

export const Dashboard_Email = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<EmailsModelProps[]>([]);

  const handleClick = () => {
    navigate("/dashboard/email");
  };

  useEffect(() => {
    getEmails().then((res) => {
      setEmails(res);
      console.log(res);
    });
  }, []);

  return (
    <Box w="80%" mx="auto">
      <Flex p="4">
        <Spacer />
        <Button className="bg-orange-200 text-orange-800 hover:bg-orange-300 transition-all border border-primary py-1 px-3 rounded-md " onClick={handleClick} colorScheme="red">
          Criar campanha de e-mail
        </Button>
      </Flex>

      <Tabs className="mt-4">
        <TabList className="gap-6">
          <Tab className="nav-link">Todos ({emails.length})</Tab>
          <Tab className="nav-link">Enviados (0)</Tab>
          <Tab className="nav-link">Rascunhos (0)</Tab>
          <Tab className="nav-link">Agendados (0)</Tab>
          <Tab className="nav-link">Em execução (0)</Tab>
        </TabList>

        <InputGroup mt="20px" className="input-default w-full" >
          <Input className="bg-transparent outline-none w-full" placeholder="ID da campanha, Nome" />
          <SearchIcon  className="my-auto"/>
        </InputGroup>

        <TabPanels>
          <TabPanel>
            {emails === null ? (
              <Heading fontSize="2xl">Nenhum dado encontrado</Heading>
            ) : (
              <Table>
                <Tbody>
                  {emails.map((item, i) => (
                    <tr key={i}>
                      <Td w="100px" maxW="fit-content">{`ID: ${item.id}`}</Td>
                      <Td maxW="fit-content">{item.campaign_name}</Td>
                      <Td>{`De: ${item.from}`}</Td>
                      <Td>{`Para: ${item.to}`}</Td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>

          {/* Remaining TabPanel elements */}
        </TabPanels>
      </Tabs>

    </Box>
  );
};
