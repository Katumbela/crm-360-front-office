import React, { useState } from "react";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, Spacer, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { NavbarAfter } from "../components/NavbarAfter";
import { ShowEmail } from "../components/ShowEmail";
import { useNavigate } from "react-router-dom";

interface Email {
  campaign_name: string;
  from: string;
  to: string;
  subject: string;
  body: string;
}

const initialEmailState: Email = {
  campaign_name: "",
  from: "",
  to: "",
  subject: "",
  body: "",
};

const sendEmail = (newEmail: Email) => {
  return fetch(`http://localhost:8080/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmail),
  }).then((res) => res.json());
};

export const EmailCampaign = () => {
  const [email, setEmail] = useState<Email>(initialEmailState);
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
    console.log(email);
  };

  const handleSend = () => {
    sendEmail(email)
      .then((res) => {
        console.log(res);
        onOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <Box bg="blackAlpha.100">
      <NavbarAfter />
      <Flex py="20px" direction={{ base: "column", md: "row" }} gap="20px">
        <Stack
          border="1px"
          borderColor="blackAlpha.100"
          w={{ base: "80%", md: "48%" }}
          m="auto"
          textAlign="left"
          p="10"
          spacing="5"
          bg="white"
          borderRadius="15"
        >
          <Heading fontSize="2xl" color="green.900">
            Create an email campaign
          </Heading>
          <Divider />
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap="5">
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl isRequired>
                <FormLabel>Campaign Name</FormLabel>
                <Input type="text" name="campaign_name" value={email.campaign_name} onChange={handleChange} placeholder="Enter campaign name here" />
              </FormControl>
            </GridItem>
            {/* ...Outros campos de entrada... */}
          </Grid>
        </Stack>
        <Spacer />
        <ShowEmail email={email} />
      </Flex>
      {isVisible ? (
        <Button px="20" colorScheme="blue" mb="10">
          Send Email
        </Button>
      ) : (
        <Button disabled={email.campaign_name === "" || email.from === "" || email.to === "" || email.body === "" || email.subject === ""} onClick={handleSend} px="20" colorScheme="blue" mb="10">
          Send Email
        </Button>
      )}
    </Box>
  );
};
