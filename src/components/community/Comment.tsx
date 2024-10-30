import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface CommentProps {
  author: string;
  content: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Comment({
  author,
  content,
  date,
  onEdit,
  onDelete,
}: CommentProps) {
  return (
    <Box
      mb={4}
      p={4}
      bg="gray.700"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.600"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.400">
            {author}
          </Text>
          <Text fontSize="sm" color="gray.400" mb={2}>
            {date}
          </Text>
        </Box>
        <Flex>
          <IconButton
            icon={<FaEdit />}
            aria-label="Edit Comment"
            size="sm"
            colorScheme="blue"
            onClick={onEdit}
            mr={2}
          />
          <IconButton
            icon={<FaTrash />}
            aria-label="Delete Comment"
            size="sm"
            colorScheme="red"
            onClick={onDelete}
          />
        </Flex>
      </Flex>
      <Text fontSize="md" color="white">
        {content}
      </Text>
    </Box>
  );
}
