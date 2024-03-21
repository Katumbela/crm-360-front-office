import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import logo from "../../assets/Images/logo-new-2.png";
import { UserModel } from "@/domain/models";

interface Signup_2Props {
  user: UserModel;
  handleChange: () => void;
  handlePart: () => void;
}

export const Signup_2 = ({ user, handleChange, handlePart }: Signup_2Props) => {
  //const [show, setShow] = useState(false);

  /*
  const handleShowBtn = () => {
    setShow(!show);
  };
  */

  const { first_name, last_name, company_name, website } = user;

  return (
    <Flex h="100vh">
      <Box w="70%" py={10} px={8}>
        <Link href="/">
          <Image src={logo} className="logo"></Image>
        </Link>
        <Stack w="65%" m="auto" my="20" textAlign="left" spacing={7}>
          <Heading color="green.900" fontSize="3xl">
            let's start with the basics.
          </Heading>
          <Text color="gray.600">
            First, we need to know a few things about you.
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap="10">
            <GridItem>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input onChange={handleChange} name="first_name" type="text" />
                <FormErrorMessage>First name is required.</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input onChange={handleChange} name="last_name" type="text" />
                <FormErrorMessage>Last name is required.</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel>Company name</FormLabel>
                <Input
                  onChange={handleChange}
                  name="company_name"
                  type="text"
                />
                <FormErrorMessage>Company name is required.</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel>Website</FormLabel>
                <Input onChange={handleChange} name="website" type="url" />
                {/* <FormErrorMessage>Email is required.</FormErrorMessage> */}
              </FormControl>
            </GridItem>
          </Grid>

          <Button
            w="100px"
            colorScheme="blue"
            disabled={
              first_name == "" ||
              last_name == "" ||
              company_name == "" ||
              website == ""
            }
            onClick={handlePart}
          >
            Next
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
