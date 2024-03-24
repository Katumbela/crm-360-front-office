import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react"


interface FeatureProps {
    title: string,
    desc: string,
    src: string
}

export const Feature = ({title, desc, src, ...rest}: FeatureProps)=>{
    return (
        <Stack direction='row' gap={2}>
            <Image w={18} h={18} alt='icon' src={src}/>
            <Box boxShadow='none'
              {...rest} 
             textAlign='left'
             >
                <Heading className="text-xl font-bold text-orange-700" fontSize='2xl'>{title}</Heading>
                <Text mt={4} color="whiteAlpha.700" className="text-md text-gray-600">{desc}</Text>
            </Box>
        </Stack>
        
    )
}