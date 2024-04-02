import { Box, Flex, Icon, Show } from "@chakra-ui/react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar } from "../components/Sidebar";
import { NavbarAfter } from "../components/NavbarAfter";
import { Dashboard_Home } from "../components/Dashboard_Home";
import { Dashboard_Email } from "../components/Dashboard_Email";
import { Dashboard_Templates } from "../components/Dashboard_Templates";
import { Dashboard_Statistics } from "../components/Dashboard_Statistics";
import { Dashboard_Settings } from "../components/Dashboard_Settings";
import { Dashboard_Contact } from "../components/Dashboard_Contacts";

export const Dashboard = () => {
  const [view, setView] = useState("Dashboard");
  const [show, setShow] = useState(true);

  const handleView = (title: string) => {
    setView(title);
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Box>
      <NavbarAfter />

      <Flex className="relative">
        <Show below="md">
          <h1>Mostrar</h1>
          <Icon onClick={handleClick} className="text-3xl" as={GiHamburgerMenu} />
          {show && <Sidebar view={""} handleView={handleView} />}
        </Show>
        <Show >
          <Sidebar view={view} handleView={handleView} />
        </Show>

        <div className="ps-[6rem] pe-6 w-full pt-[6.5rem]">
          <h2 className="ms-[8rem] text-orange-500 font-bold text-3xl">{view}</h2>
          {view === "Dashboard" ? (
            <Dashboard_Home />
          ) : view === "Email" ? (
            <Dashboard_Email />
          ) : view === "Templates" ? (
            <Dashboard_Templates />
          ) : view === "Estatísticas" ? (
            <Dashboard_Statistics />
          ) : view === "Contatos" ? (
            <Dashboard_Contact />
          ) : (
            <Dashboard_Settings />
          )}
        </div>
      </Flex>
    </Box>
  );
};
