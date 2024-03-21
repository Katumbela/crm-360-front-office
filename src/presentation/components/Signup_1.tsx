import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Icon,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/Images/logo-new-2.png";
import { UserModel } from "@/domain/models";

interface Signup_1Props {
  user: UserModel;
  handleChange: () => void;
  handlePart: () => void;
}

export const Signup_1 = ({ user, handleChange, handlePart }: Signup_1Props) => {
  const [show, setShow] = useState(false);

  const handleShowBtn = () => {
    setShow(!show);
  };

  return (
    <Flex h="100vh">
      <Box h="100vh" overflowY="scroll" py={10} px={8}>
        <Link href="/">
          <Image src={logo} className="logo"></Image>
        </Link>
        <Stack w="65%" m="auto" my="15" textAlign="left" spacing={7}>
          <Heading color="green.900" fontSize="3xl">
            Create your account. No Credit card needed.
          </Heading>
          <Text color="gray.600">
            Send your first emails in a few minutes. Already have an account?
            <Link
              ml="2"
              color="red.400"
              textDecor="underline"
              _hover={{ color: "blue" }}
              href="/login"
            >
              Login
            </Link>
          </Text>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              value={user.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <FormErrorMessage>Email is required.</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                value={user.password}
                onChange={handleChange}
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter Password"
              />
              <InputRightElement>
                <Button onClick={handleShowBtn}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>At least 8 character long</FormHelperText>
          </FormControl>

          <Button
            disabled={user.email == "" || user.password.length < 8}
            onClick={handlePart}
            colorScheme="blue"
          >
            Create an account
          </Button>

          <Divider />
          <Text textAlign="center">OR</Text>

          <Button
            fontSize={{ base: "0.9rem", md: "1.1rem" }}
            gap="4"
            bg="white"
            border="1px"
            borderColor="green"
          >
            <Icon as={FcGoogle} />
            Sign in with Google
          </Button>

          <Button
            fontSize={{ base: "0.9rem", md: "1.1rem" }}
            gap="4"
            bg="white"
            border="1px"
            borderColor="green"
          >
            <Icon as={BsApple} />
            Sign in with Apple
          </Button>

          <Text color="gray.600">
            By Signing up, you are creating a CRM 360 account, and you agree to
            CRM 360 's{" "}
            <Link color="red.400" textDecor="underline">
              Terms of use
            </Link>{" "}
            and{" "}
            <Link color="red.400" textDecor="underline">
              Privacy Policy
            </Link>
          </Text>
        </Stack>
      </Box>

      <Box>
        <Image
          h="100%"
          alt="signup_Image"
          src="https://sendinblue.fra1.digitaloceanspaces.com/fra1.digitaloceanspaces.com/marketing-content-media/register.webp"
        />
      </Box>
    </Flex>
  );
};
