import { Box, Button, Center, CircularProgress, CircularProgressLabel, Divider, Flex, Heading, Icon, Spacer, Stack, Text } from "@chakra-ui/react"
import { FaUsers, FaEye, FaBan } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsHandIndexThumb } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const contents = [
    { icon: FaUsers, count: 1, desc: "All your contacts", percent: "_", color: "black" },
    { icon: FaEye, count: 0, desc: "opened Details", percent: "0%", color: "red.400" },
    { icon: BsHandIndexThumb, count: 0, desc: "clicked", percent: "0%", color: "green.500" },
    { icon: FaBan, count: 0, desc: "blacklisted", percent: "0%", color: "orange.400" }
]


export const Dashboard_Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard/email')
    }

    return ( 
        <Box className=" ps-[8rem] ">

           <Divider color="blue.300" />

            <Box className="ms-[]" mt="20px" bg="#F9FAFC" padding="6">
                <Flex direction={{ base: "column", md: "row" }} >
                    <Box textAlign="left" lineHeight="45px">
                        <Heading color="green.900" fontSize="2xl">Comece com campanhas de e-mail</Heading>
                        <Text fontSize="1.1rem">Siga esses primeiros passos para enviar sua primeira campanha de e-mail.</Text>
                    </Box>

                    <Spacer />

                    <Text
                        color="red.400"
                        fontWeight="500"
                        cursor="pointer"
                        _hover={{
                            bg: "white",
                            textDecor: "underline"
                        }}
                    >Pular esta etapa</Text>

                </Flex>

                <Flex gap={9} direction={{ base: "column", md: "row" }}>
                    <Center display="flex" flexDirection="column">
                        <CircularProgress size="150px" value={33} color="red.400">
                            <CircularProgressLabel>33%</CircularProgressLabel>
                        </CircularProgress>
                        <Text color="gray.700" fontSize="md">Configuração de campanhas de e-mail</Text>
                    </Center>
                    <Box fontSize="1.1rem" w="80%">
                        <Flex gap="4" padding="13px" color="gray">
                            <Center boxSize='12' borderRadius="50">
                                <Icon boxSize='12' color="green.500" as={AiFillCheckCircle} />
                            </Center>

                            <Box textAlign='left' lineHeight={7} >
                                <Text as="b">Complete o formulário do seu perfil</Text>
                                <Text>Preencha o formulário do seu perfil para concluir seu cadastro</Text>
                            </Box>
                        </Flex>


                        <Divider />


                        <Flex gap="4" padding="13px"
                            cursor="pointer"
                            _hover={{
                                bg: "blackAlpha.50"
                            }}
                        >
                            <Center border='1px' borderColor="green.900"
                                boxSize='12'
                                borderRadius="50">
                                <Icon boxSize='5'
                                    color="blue.700" as={FaUsers} />
                            </Center>

                            <Box textAlign='left' lineHeight={7}>
                                <Text as="b" _hover={{ color: "red.400" }}>Importe todos os seus contatos</Text>
                                <Text>Carregue seus contatos para começar a enviar campanhas de e-mail para eles</Text>
                            </Box>
                        </Flex>


                        <Divider />


                        <Flex gap="4" padding="13px" cursor="pointer"
                            _hover={{
                                bg: "blackAlpha.50"
                            }}>
                            <Center border='1px' borderColor="green.900" boxSize='12' borderRadius="50">
                                <Icon boxSize='6' color="green.500" as={MdEmail} />
                            </Center>

                            <Box textAlign='left' lineHeight={7}>
                                <Text as="b" _hover={{ color: "red.400" }}>Agende sua primeira campanha de e-mail</Text>
                                <Text>Configure, projete e agende sua campanha de e-mail</Text>
                            </Box>
                        </Flex>

                    </Box>

                </Flex>
            </Box>

            <Flex mt="20px" gap="20px" justifyContent="space-between" direction={{ base: 'column', md: "row" }}>
                {
                    contents.map((item, i) => (
                        <Stack textAlign="center" w={{ base: "80%", md: "23%" }} m="auto" key={i} border="1px" borderColor="gray.300" p="20px">
                            <Icon fontSize="30" m="auto" color={item.color} as={item.icon} />
                            <Heading color={item.color}>{item.count}</Heading>
                            <Text>{item.desc}</Text>
                            <Text color={i === 0 ? "white" : "gray.600"}>{item.percent}</Text>
                        </Stack>
                    ))
                }
            </Flex>

            <Stack border="1px"
                borderColor="gray.300"
                w={{ base: '80%', md: "49%" }} m={{ base: "auto" }} mt="30px" p="20px"
                spacing="6"
            >
                <Heading fontSize="2xl" textAlign='left'>Campanhas de e-mail</Heading>
                <Text fontSize="1.2rem" as="i" color="gray.400">Nenhuma campanha encontrada</Text>

                <Center>
                    <Button onClick={handleClick} fontSize="0.9rem" maxW="fit-content" colorScheme='blue' gap={1}>
                        <Icon as={BiPlusMedical} /> Criar uma Nova Campanha
                    </Button>
                </Center>
            </Stack>


            <Button bg="green.900"
                borderRadius="50px"
                color="white"
                gap="2" position='sticky'
                bottom="3" left="90%"
                right="10px"
                padding="5"
                _hover={{ bg: "green.900" }}
            >
                <QuestionOutlineIcon />
                Suporte
            </Button>

        </Box>
    )
}