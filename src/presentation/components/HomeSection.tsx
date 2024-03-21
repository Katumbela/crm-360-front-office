import { contData } from "../../utils"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text } from "@chakra-ui/react"


export const HomeSection = ()=>{
    return (
        <Stack w="75%" m="auto" mt="100px"  spacing="20">
            {
                contData.map((item, i)=>(
                    <Flex key={i} gap='40px'>
                        <Heading fontSize='3xl' w="30%" textAlign='right'>{item.heading}</Heading>
                        <Grid 
                        w="68%"
                        templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)'}}
                        gap={20}
                        >
                            {
                                item.data.map((item, i)=>(
                                    <GridItem key={i}>
                                        <Flex alignItems="flex-start" gap='10px'>
                                            <Image src={item.image} />
                                            <Box textAlign='left'>
                                                <Heading as='h3' fontSize="xl" >{item.title}</Heading>
                                                <Text color="gray.600">{item.desc}</Text>
                                            </Box>
                                            <ChevronRightIcon 
                                            boxSize={5} color="red.400" 
                                            cursor='pointer'  />
                                        </Flex>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </Flex>
                ))
            }
            

            <Center>
                <Button 
                colorScheme='blue'
                w='180px' fontSize='md'
                borderRadius="50"
                >All features</Button>
            </Center>
            
            <Divider />

        </Stack>
    )
}