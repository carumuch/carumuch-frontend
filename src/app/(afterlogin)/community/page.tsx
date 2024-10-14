'use client';

import { Box, Flex, Stack, Text, Icon, HStack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostPreviewProps {
  title: string;
  content: string;
  comments: number;
  date: string;
  author: string;
}

function PostPreview({
  title,
  content,
  comments,
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
      onClick={() => router.push('/community/1')}
    >
      {/* 제목 */}
      <Text fontSize="lg" fontWeight="bold" color="white" isTruncated>
        {title}
      </Text>
      {/* 내용 */}
      <Text fontSize="sm" color="gray.400" noOfLines={2} mt={2}>
        {content}
      </Text>
      {/* 댓글, 날짜, 작성자 */}
      <HStack justify="space-between" mt={4}>
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.400">
            {date}
          </Text>
          <Text fontSize="sm" color="gray.400">
            | {author}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={ChatIcon} color="gray.400" />
          <Text fontSize="sm" color="gray.400">
            {comments}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
}

export default function CommunityPage() {
  const [posts] = useState<PostPreviewProps[]>([
    {
      title: '차량 덴트 해보신분 계신가요?',
      content:
        '셀프덴트라고 아시니요?? 제가 요즘 이용하고 있는 체험단에서 신청해서 선정되어 물건을 받고 사용 후기를 올리려고 합니다.',
      comments: 2,
      date: '2024-10-10',
      author: '차량사고엔차박고',
    },
    {
      title: '차대번호 관련 질문 있습니다.',
      content:
        '차대번호와 차량번호 많이 헷갈려 하시는 부분이죠. 예를 들어 부품을 교환할 때 "차대번호가 어떻게 되시죠?"라는 질문을 종종 받곤 합니다.',
      comments: 5,
      date: '2024-10-07',
      author: '뚜벅뚜벅뚜벅이',
    },
    {
      title: '졸업 할 수 있나요?',
      content: '정답은 "패스트 캠퍼스"다.',
      comments: 128,
      date: '2024-09-05',
      author: 'git clone',
    },
    {
      title: '중부대 세종관 근처 마후라 소음',
      content: '누군가요;? 너무 시끄러워요',
      comments: 22,
      date: '2024-08-31',
      author: 'A두개C네개',
    },
    {
      title: '차량 사고 문의',
      content: '선제시',
      comments: 22,
      date: '2024-08-31',
      author: 'A두개C네개',
    },
    // 반복될 다른 글 미리보기 추가 가능
  ]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="gray.800"
      minH="100vh"
      mb={27}
    >
      {/* 헤더 */}
      <Header title="커뮤니티" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        {/* <Stack spacing={6}> */}
        <Stack>
          {/* 게시물 미리보기 렌더링 */}
          {posts.map((post, index) => (
            <PostPreview
              key={index}
              title={post.title}
              content={post.content}
              comments={post.comments}
              date={post.date}
              author={post.author}
            />
          ))}
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
