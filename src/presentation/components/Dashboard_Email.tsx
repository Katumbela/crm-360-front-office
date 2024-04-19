import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

/*
const getEmails = () => {
  return fetch(`http://localhost:8080/emails`).then((res) => res.json());
};
*/
export const Dashboard_Email = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/email");
  };
  /*
  useEffect(() => {
    getEmails().then((res) => {
      setEmails(res);
      console.log(res);
    });
  }, []);
*/
  return (
    <Box w="80%" mx="auto">
      <Flex p="4">
        <Spacer />
        <Button
          className="px-3 py-1 text-orange-800 transition-all bg-orange-200 border rounded-md hover:bg-orange-300 border-primary "
          onClick={handleClick}
          colorScheme="red"
        >
          Criar campanha de e-mail
        </Button>
      </Flex>

      <Tabs className="mt-4">
        <TabList className="gap-6">
          <Tab className="nav-link">Todos </Tab>
          <Tab className="nav-link">Enviados (0)</Tab>
          <Tab className="nav-link">Rascunhos (0)</Tab>
          <Tab className="nav-link">Agendados (0)</Tab>
          <Tab className="nav-link">Em execução (0)</Tab>
        </TabList>

        <InputGroup mt="20px" className="w-full input-default">
          <Input
            className="w-full bg-transparent outline-none"
            placeholder="ID da campanha, Nome"
          />
          <SearchIcon className="my-auto" />
        </InputGroup>

        <TabPanels>
          <TabPanel></TabPanel>

          {/* Remaining TabPanel elements */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
