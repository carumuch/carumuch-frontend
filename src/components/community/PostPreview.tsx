// src/components/community/PostPreview.tsx
import { Box, Text, HStack, Icon } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/dateUtils';

interface PostPreviewProps {
  id: number;
  title: string;
  content: string;
  commentsCount: number;
  date: string;
  author: string;
}

export default function PostPreview({
  id,
  title,
  content,
  commentsCount,
  date,
  author,
}: PostPreviewProps) {
  const router = useRouter();

  return (
    <Box
      bg="gray.700"
      p={4}
      rounded="md"
      borderWidth="1px"
      borderColor="gray.600"
      mb={2}
      onClick={() => router.push(`/community/${id}`)}
    >
      <Text fontSize="lg" fontWeight="bold" color="white" isTruncated>
        {title}
      </Text>
      <Text fontSize="sm" color="gray.400" noOfLines={2} mt={2}>
        {content}
      </Text>
      <HStack justify="space-between" mt={4}>
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.400">
            {formatDate(date)}
          </Text>
          <Text fontSize="sm" color="gray.400">
            | {author}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={ChatIcon} color="gray.400" />
          <Text fontSize="sm" color="gray.400">
            {commentsCount}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
}
