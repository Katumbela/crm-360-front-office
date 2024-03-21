import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HomeSection } from "./HomeSection";
import { HomeReviews } from "./HomeReviews";

export const HomeMidView = () => {
  return (
    <Container bg="blue.500" maxW="100vw" mt="300px" p={100}>
      <Flex
        w="80%"
        m="auto"
        mt="100px"
        gap={40}
        borderBottom="1px"
        borderColor="gray.300"
        pb="50px"
      >
        <VStack align="flex-start" textAlign="start" spacing={8}>
          <Heading fontSize="5xl" color="green.900">
            Leading the way in Digital Marketing
          </Heading>
          <Text lineHeight={2} color="gray.600">
            Named as one of the Top 100 software companies of 2021 and rated as
            the best Marketing Automation platform for SMBs. Grow your business
            with CRM 360 !
          </Text>
          <Box lineHeight="10">
            <HomeReviews title="Reputação 360" />
          </Box>
        </VStack>
      </Flex>

      <VStack>
        <Flex
          gap="-4"
          position="relative"
          w="300px"
          alignItems="center"
          justify="center"
          mt="10"
        >
          <Image
            position="absolute"
            left="12"
            top="12"
            w="50px"
            // h="60px"
            // border="1px"
            src="https://www.sendinblue.com/wp-content/themes/sendinblue2019/assets/images/home/section-tools/icn-obj-3.png"
          />
          <Image
            // position="absolute"
            left="50px"
            w="120px"
            // h="120px"
            src="https://www.sendinblue.com/wp-content/themes/sendinblue2019/assets/images/home/section-tools/icn-obj-1.png"
          />
          <Image
            position="absolute"
            left="150px"
            top="12"
            w="120px"
            h="120px"
            src="https://www.sendinblue.com/wp-content/themes/sendinblue2019/assets/images/home/section-tools/icn-obj-2.png"
          />
        </Flex>

        <Heading fontSize="5xl" color="green.900">
          Do it all with CRM 360{" "}
        </Heading>
        <Text fontSize="xl" color="gray.500">
          all the tools you need and few new ones to try
        </Text>
      </VStack>

      <HomeSection />
    </Container>
  );
};
