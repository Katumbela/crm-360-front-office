import { UserModel } from '../../domain/models';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Image,
	Grid,
	GridItem
} from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { NavLink } from 'react-router-dom'
import logo from "../../assets/Images/logo-new-2.png";
import bg_s from "../../assets/Images/bg-signup-2.webp";

interface Signup_3Props {

	user: UserModel;
	handleChange: (e: any) => void;
	handlePartNext: () => void;
	handlePartPrev: () => void;
}


interface Country {
	name: string;
	code: string;
}


interface AddressSuggestion {
	display_name: string;
	// Adicione outras propriedades conforme necessário
}

export default function Signup_3({ handleChange, handlePartPrev, handlePartNext }: Signup_3Props) {
	// const { phone } = user;
	const [address, setAddress] = useState("");
	const [countries, setCountries] = useState<Country[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);


	const [phoneNumber, setPhoneNumber] = useState('');

	const handlePhoneChange = (value: any) => {
		setPhoneNumber(value);
		handleChange({ target: { name: 'phone', value: value } });
	};


	const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		try {
			// Faz uma chamada para a API do OpenStreetMap Nominatim
			const response = await axios.get<AddressSuggestion[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`);

			// Atualiza as sugestões com base na resposta da API
			setSuggestions(response.data);
			setShowSuggestions(true);
		} catch (error) {
			console.error('Erro ao obter sugestões de endereço:', error);
		}

		// Atualiza o estado do endereço
		setAddress(inputValue);
	};

	const handleSuggestionClick = (address: string) => {
		// Preenche automaticamente o campo de endereço com a sugestão selecionada
		setAddress(address);
		setShowSuggestions(false);
	};

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then(response => response.json())
			.then((data: any) => {
				const countriesData: Country[] = data.map((country: any) => ({
					name: country.name.common,
					code: country.cca2
				}));
				setCountries(countriesData);
			})
			.catch(error => console.error('Error fetching countries:', error));
	}, []);

	return (
		<Flex h="100vh" overflowY="auto">
			<Box w="70%" className='grid items-center' py={10} px={8}>


				<Stack w="65%" m="auto"className='bg-slate-100/30 border p-14 rounded-md shadow-md' my="20" textAlign="left" spacing={7}>

					<NavLink
						className={' absolute top-2 left-2 flex gap-2 px-2 w-[5rem] hover:text-orange-600 hover:rounded-lg py-1 hover:bg-orange-100/40 transition-all'}
						to={'/'}
					>
						<BsArrowLeftShort className="my-auto" />
						Voltar
					</NavLink>
					<NavLink to="/" className={'mt-3'}>
						<Image src={logo} alt="" className="logo w-[8rem]" />
					</NavLink>
					<Button w="fit-content" className='text-3xl text-orange-600 font-new-rocker' gap={2} color="red.400" bg="white">
						Informações Pessoais
					</Button>
					<Heading color="green.900" className='text-sm font-truculenta' fontSize="3xl">
						Agora algumas informações sobre sua empresa
					</Heading>
					<Text className='text-sm font-truculenta' >
						Ainda não tem um endereço da empresa? Insira o endereço que deseja usar para o seu negócio.
					</Text>


					<Grid templateColumns="repeat(2, 1fr)" gap="10">
						<GridItem colSpan={2}>
							<FormControl isRequired className='relative'>
								<FormLabel className="label-sm">Endereço </FormLabel>
								<Input
									className='input-default'
									onChange={handleAddressChange}
									name="address"
									type="text"
									value={address}
								/>

								{/* Mostra as sugestões de endereço */}
								{showSuggestions && suggestions.length > 0 && (
									<ul className='bg-orange-100 absolute shadow-xl w-full rounded-b-xl h-[12rem] overflow-y-auto z-10 px-2'>
										{suggestions.map((suggestion, index) => (
											<li className='cursor-pointer my-1 py-1 px-2 rounded-md hover:bg-orange-200 hover:text-orange-600' key={index} onClick={() => handleSuggestionClick(suggestion.display_name)}>
												{suggestion.display_name}
											</li>
										))}
									</ul>
								)}
							</FormControl>
						</GridItem>

						<GridItem>
							<FormControl >
								<FormLabel className='mb-1 label-sm'>Telefone</FormLabel>
								<PhoneInput
									country={'ao'} // Código do país padrão, neste caso, Brasil
									value={phoneNumber}
									onChange={handlePhoneChange}
									containerStyle={{ width: '60%' }} // Estilo do contêiner do componente
								/>
							</FormControl>
						</GridItem>

						<GridItem>
							<FormControl isRequired>
								<FormLabel className="label-sm">Country</FormLabel>
								<select className='input-default' name="country" onChange={handleChange}>
									{countries.map(country => (
										<option key={country.code} value={country.name}>{country.name}</option>
									))}
								</select>
							</FormControl>
						</GridItem>
					</Grid>


					<div className="flex mt-4 justify-between">

						<Button
							className="rounded-md hover:bg-orange-200 transition-all bg-orange-100 border py-1 px-4 text-orange-600 border-primary"

							onClick={handlePartPrev}
						>

							<BsArrowLeftShort />
							Anterior
						</Button>
						<button

							className="rounded-md flex disabled:bg-slate-200 disabled:border-slate-400 disabled:text-slate-600 hover:bg-orange-200 transition-all bg-orange-100 border py-1 px-4 text-orange-600 border-primary"
							disabled={
								phoneNumber == "" ||
								address == ""
							}
							onClick={handlePartNext}
						>
							Próximo
							<BsArrowRightShort className="my-auto" />
						</button>

					</div>
				</Stack>
			</Box>

			<Box>
				<Image
					h="100%"
					alt="signup_Image"
					src={bg_s}
				/>
			</Box>
		</Flex>
	)
}
