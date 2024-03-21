import { HStack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";

interface HomeReviewsProps {
  title?: string;
  reviews?: number;
}

export const HomeReviews: React.FC<HomeReviewsProps> = ({ title, reviews }) => {
  return (
    <HStack>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <StarIcon
            key={i}
            color={i < Math.floor(5) ? '#FFD201' : 'gray.300'}
            fontSize="2xl"
          />
        ))}
      <Text as='b'>{5}/5</Text>
      <Text>on {title}/ {reviews}+ reviews</Text>
    </HStack>
  );
};
