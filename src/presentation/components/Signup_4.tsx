import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Link,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
  Select,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { authContext } from "../context/AuthContext";
import logo from "../../assets/Images/logo-new.jpeg";
import { UserModel } from "@/domain/models";

interface Signup_4Props {
  user: UserModel;
  handleChange: () => void;
}

export const Signup_4 = ({ user, handleChange }: Signup_4Props) => {
  const navigate = useNavigate();
  const [selling, setSelling] = useState("no");
  const { team, contacts } = user;

  const handleSubmit = () => {
    alert("Sucessfully created your account!!");
    navigate("/dashboard");
    // handleSignup(user);
  };

  const setOnlineSelling = (e: any) => {
    user.online_selling = e;
    // console.log(user.online_selling)
    setSelling(e);
  };

  return (
    <Flex h="100vh" overflowY="auto">
      <Box w="70%" py={10} px={8}>
        <Link href="/">
          <Image src={logo} className="logo"></Image>
        </Link>
        <Stack w="65%" m="auto" my="20" textAlign="left" spacing={7}>
          <Button w="fit-content" gap={2} color="red.400" bg="white">
            <ArrowBackIcon /> Company details
          </Button>

          <Heading color="green.900" fontSize="3xl">
            Tell us more about your business
          </Heading>
          <Text color="gray.600">
            This will allow us to better address your business needs.
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap="10">
            <GridItem>
              <FormControl isRequired>
                <FormLabel>How many people are in your team?</FormLabel>
                <Select
                  name="team"
                  onChange={handleChange}
                  placeholder="Select your company size"
                >
                  <option value="0-1 employee">0-1 employee</option>
                  <option value="2-10 employees">2-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-250 employees">51-250 employees</option>
                  <option value="> 250 employee">{"> 250 employee"}</option>
                </Select>
                <FormErrorMessage>Address is required.</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired>
                <FormLabel>How many contacts do you have?</FormLabel>
                <Select
                  name="contacts"
                  onChange={handleChange}
                  placeholder="Select your company size"
                >
                  <option value="1-300">1-300</option>
                  <option value="301-2k">301-2k</option>
                  <option value="2001-5k">2001-5k</option>
                  <option value="5k-20k">5k-20k</option>
                  <option value="20k-100k">20k-100k</option>
                  <option value="More than 100k">More than 100k</option>
                  <option value="No contacts yet">No contacts yet</option>
                </Select>
                <FormErrorMessage>Zipcode is required.</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Do you sell online?</FormLabel>
                <RadioGroup
                  name="online_selling"
                  onChange={setOnlineSelling}
                  value={selling}
                >
                  <Stack spacing={10} direction="row">
                    <Radio value="yes">yes</Radio>
                    <Radio value="no">no</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </GridItem>
          </Grid>

          <Button
            w="100px"
            colorScheme="blue"
            disabled={team == "" || contacts == null}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>

      <Box>
        <Image
          h="100%"
          alt="signup_Image"
          src="https://sendinblue.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/marketing-content-media/profile.webp"
        />
      </Box>
    </Flex>
  );
};
