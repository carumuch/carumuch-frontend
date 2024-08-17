import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Images from '../../public/images';

export default function Home() {
  return (
    <div className="container">
      <Box>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="26vh"
          mt="14"
        >
          <Flex direction="row" align="center">
            <Text fontSize="5xl" fontWeight="bold">
              Car U Much?
            </Text>
          </Flex>
          <Text mt="2" fontSize="s" fontWeight="bold">
            쉽고 빠른 AI 기반 견적 서비스 &quot;카우머치&quot;
          </Text>
        </Flex>
      </Box>
      <Box>
        <Flex align="center" justify="center">
          <Image
            src={Images.mainRepairIcon.src}
            width={Images.mainRepairIcon.width}
            height={Images.mainRepairIcon.height}
            sizes="60%"
            alt="main repair icon"
          />
        </Flex>
      </Box>
      <Box mt="4">
        <Flex direction="column" gap="2">
          <Button>일반 로그인</Button>
          <Button bg="#FEE500" _hover={{}}>
            카카오 로그인
          </Button>
          <Button bg="#03C75A">네이버 로그인</Button>
          <Button bg="#EDF2F7">구글 로그인</Button>
        </Flex>
      </Box>
    </div>
  );
}
