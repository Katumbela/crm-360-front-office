import React, { useState } from "react";
import { PricingBoxProps } from "../../dummy/pricing-list-datas";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
} from "@chakra-ui/react";
import { BsArrowRightShort, BsCheckCircleFill } from "react-icons/bs";
import { NumberUtils } from "../../utils";

const PricingBox: React.FC<PricingBoxProps> = ({
    popular,
    name,
    price: monthlyPrice,
    info = "",
    features = [],
}) => {
    const [billingOption, setBillingOption] = useState<"monthly" | "annual">(
        "monthly"
    );

    const [isHovered, setIsHovered] = useState(false);
    const isAnnual = billingOption === "annual";
    const price = isAnnual ? monthlyPrice * 12 * 0.18 : monthlyPrice * 1;

    const bgColor = popular ? 'bg-secondary-opacity' : 'bg-gray-100/70';
    const borderColor = popular ? "teal.300" : "gray.300";
        
    return (
        <Box

            overflow="hidden"
            className={`${bgColor} px-6  ${popular ? 'border-2 border-primary absolute -top-[1rem] h-[24rem]' : ''} mx-3 transition-all hover:-translate-y-1 border-hover-primary relative border w-[16rem]`}
            borderColor={borderColor}
        >
            {popular && (
                <div
                    className="absolute bg-primary px-3 py-1 font-bahiana font-semibold text-white rounded-bl-xl top-0 right-0 "
                >
                    POPULAR
                </div>
            )}
            <Text textTransform="uppercase" className="mt-6 mb-3 font-new-rocker">{name}</Text>
            <Flex alignItems="baseline" className=" font-bahiana">
                <Text fontSize="2xl" fontWeight="bold" mr={1}>
                     {NumberUtils.formatCurrency(price)}
                </Text>
                {isAnnual && (
                    <Text fontSize="sm" color="gray.600">
                        / ano
                    </Text>
                )}
                {!isAnnual && (
                    <Text fontSize="sm" color="gray.600">
                        / mês
                    </Text>
                )}
            </Flex>
            <Stack spacing={2} mt={4}>
                {features.map((feat, index) => (
                    <Flex key={index} className="font-truculenta" alignItems="center">
                        <BsCheckCircleFill className="text-primary mr-2" />
                        <Text>{feat}</Text>
                    </Flex>
                ))}
            </Stack>
            <center className="absolute bottom-3 left-0 right-0 mt-3">
                <Button
                    size="md"
                    borderRadius={0}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`${popular ? 'bg-hover-primary' :'text-primary hover-primary'} transition-all border-primary  border-2 mx-auto mt-4 px-16 py-2 `}
                >
                    Assinar
                    <BsArrowRightShort
              className={`my-auto text-2xl transition-transform duration-300 ${isHovered ? 'transform translate-x-2' : ''
                }`}
            />
                </Button>
                <Text fontSize="sm" className="text-xs px-5 mt-2 text-gray-500" mt={2}>
                    {info}
                </Text>
                {/* <Flex justify="center" className="gap-3" mt={4}>
                    <Button
                        size="xs"
                        variant="link"
                        onClick={() => setBillingOption("monthly")}
                        colorScheme={!isAnnual ? "teal" : "gray"}
                        className={`  border border-orange-300 px-2 rounded-lg cursor-pointer ${billingOption == 'monthly' ? 'bg-orange-300/60' : ''}`}
                    >
                        Mensal 
                    </Button>
                    <Button
                        size="xs"
                        variant="link"
                        onClick={() => setBillingOption("annual")}
                        colorScheme={isAnnual ? "teal" : "gray"}
                        className={` border border-orange-300 px-2 rounded-lg cursor-pointer ${billingOption == 'annual' ? 'bg-orange-300/60' : ''}`}
                    >
                        Anual
                    </Button>
                </Flex> */}

            </center>

        </Box>
    );
};

export default PricingBox;
