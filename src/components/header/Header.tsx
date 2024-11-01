// components/Header.tsx

'use client';

import { Box, Flex, Text } from '@chakra-ui/react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <Box
      w="100%"
      maxW="400px"
      bg="gray.700"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.600"
      textAlign="center"
    >
      <Flex justify="center" alignItems="center">
        <Text fontSize="lg" fontWeight="bold" color="white">
          {title}
        </Text>
      </Flex>
    </Box>
  );
}
