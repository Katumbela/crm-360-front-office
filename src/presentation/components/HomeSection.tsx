import { contData } from "../../utils"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Center, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { BsArrowRightShort } from "react-icons/bs"
import { NavLink } from "react-router-dom"
import hero from '../../assets/Images/bg-orange-dots-1.png'


export const HomeSection = () => {
    return (
        <div className="relative">
            <Image src={hero} className=" opacity-[.3] absolute  rotate-90" />
            <Image src={hero} className=" opacity-[.5] absolute bottom-0 right-0 -rotate-90 " />
            <Stack w="75%" className="relative" m="auto" mt="100px" spacing="20Í">
                {
                    contData.map((item, i) => (
                        <Flex key={i} gap='40px' className=" mt-8">
                            <Heading className="text-3xl text-orange-500 font-bold font-truculenta" w="30%" textAlign='right'>{item.heading}</Heading>
                            <Grid
                                w="68%"
                                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                                gap={20}
                            >
                                {
                                    item.data.map((item, i) => (
                                        <GridItem key={i}>
                                            <Flex className="mt-3" alignItems="flex-start" gap='10px'>
                                                <Image src={item.image} />
                                                <Box textAlign='left'>
                                                    <Heading className="font-bold text-orange-600 " fontSize="xl" >{item.title}</Heading>
                                                    <Text color="gray.600">{item.desc}</Text>
                                                </Box>
                                                <ChevronRightIcon
                                                    boxSize={5} color="red.400"
                                                    cursor='pointer' />
                                            </Flex>
                                        </GridItem>
                                    ))
                                }
                            </Grid>
                        </Flex>
                    ))
                }


                <Center>
                    <NavLink
                        to={'/signup'}
                        className={'bg-primary mt-10 flex py-3 font-bold text-white px-6'}
                    >Comece gratuitamente
                        <BsArrowRightShort className="my-auto text-2xl ms-2" />

                    </NavLink>
                </Center>

                <Divider />

            </Stack>
        </div>
    )
}