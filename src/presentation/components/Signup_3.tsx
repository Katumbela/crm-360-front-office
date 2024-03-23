import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Image,
	Grid,
	GridItem,
	Select
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

interface Signup_3Props {
	user: {
		address: string,
		city: string,
		country: string
	}
	handleChange: (e: any) => void
	handlePart: () => void
}

export default function Signup_3({ user, handleChange, handlePart }: Signup_3Props) {
	const { address, city, country } = user

	return (
		<Flex h="100vh" overflowY="auto">
			<Box w="70%" py={10} px={8}>
				<NavLink to="/">
					<Image src="@/assets/Images/logo-new.png" className="logo"></Image>
				</NavLink>

				<Stack w="65%" m="auto" my="20" textAlign="left" spacing={7}>
					<Button w="fit-content" gap={2} color="red.400" bg="white">
						<ArrowBackIcon /> Personal information
					</Button>

					<Heading color="green.900" fontSize="3xl">
						Now some information about your company
					</Heading>
					<Text color="gray.600">
						Don't have a company address yet? Enter the address you want to use for your
						business.
					</Text>

					<Grid templateColumns="repeat(2, 1fr)" gap="10">
						<GridItem colSpan={2}>
							<FormControl isRequired>
								<FormLabel>Address</FormLabel>
								<Input onChange={handleChange} name="address" type="text" />
								<FormErrorMessage>Address is required.</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem>
							<FormControl isRequired>
								<FormLabel>Zipcode</FormLabel>
								<Input type="number" onChange={handleChange} name="zipcode" />
								<FormErrorMessage>Zipcode is required.</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem>
							<FormControl isRequired>
								<FormLabel>City</FormLabel>
								<Input onChange={handleChange} name="city" type="text" />
								<FormErrorMessage>City is required.</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem>
							<FormControl isRequired>
								<FormLabel>Country</FormLabel>
								<Select name="country" onChange={handleChange} placeholder="Select">
									<option value="India">India</option>
									<option value="Japan">Japan</option>
									<option value="China">China</option>
									<option value="USA">USA</option>
									<option value="Brazil">Brazil</option>
									<option value="Canada">Canada</option>
									<option value="Egypt">Egypt</option>
									<option value="France">France</option>
									<option value="Italy">Italy</option>
									<option value="Maldives">Maldives</option>
									<option value="Mali">Mali</option>
									<option value="Nepal">Nepal</option>
								</Select>
							</FormControl>
						</GridItem>
					</Grid>

					<Button
						w="100px"
						colorScheme="blue"
						disabled={address == '' || city == '' || country == ''}
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
	)
}
