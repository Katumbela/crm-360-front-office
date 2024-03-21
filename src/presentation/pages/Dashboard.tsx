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

export const Dashboard = () => {
  const [view, setView] = useState("Dashboard");
  const [show, setShow] = useState(false);

  const handleView = (title: string) => {
    setView(title);
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Box>
      <NavbarAfter />

      <Flex>
        <Show below="md">
          <Icon onClick={handleClick} fontSize="2xl" as={GiHamburgerMenu} />
          {show && <Sidebar view={""} handleView={handleView}/>}
        </Show>
        <Show above="md">
          <Sidebar view={view} handleView={handleView} />
        </Show>

        {view === "Dashboard" ? (
          <Dashboard_Home />
        ) : view === "Email" ? (
          <Dashboard_Email />
        ) : view === "Templates" ? (
          <Dashboard_Templates />
        ) : view === "Statistics" ? (
          <Dashboard_Statistics />
        ) : (
          <Dashboard_Settings />
        )}
      </Flex>
    </Box>
  );
};
