// src/components/community/Comment.tsx

import { Box, Text } from '@chakra-ui/react';

interface CommentProps {
  author: string;
  content: string;
  date: string;
}

export default function Comment({ author, content, date }: CommentProps) {
  return (
    <Box
      mb={4}
      p={4}
      bg="gray.700"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.600"
    >
      <Text fontSize="sm" color="gray.400">
        {author}
      </Text>
      <Text fontSize="sm" color="gray.400" mb={2}>
        {date}
      </Text>
      <Text fontSize="md" color="white">
        {content}
      </Text>
    </Box>
  );
}
