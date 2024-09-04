'use client';

import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
}

function NavItem({ icon, label }: NavItemProps) {
  return (
    <Box textAlign="center" position="relative">
      <IconButton
        aria-label={label}
        icon={<Box as={icon} w={6} h={6} />}
        variant="ghost"
        color="gray.600"
      />
      <Text fontSize="sm" color="gray.600" mt={1}>
        {label}
      </Text>
    </Box>
  );
}

function BottomNavBar() {
  return (
    <Flex
      as="nav"
      position="fixed"
      bottom="0"
      width="100%"
      maxW="480px" // 최대 너비를 480px로 설정
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      justifyContent="space-around"
      alignItems="center"
      paddingY={2}
      zIndex="1000"
    >
      <NavItem icon={AtSignIcon} label="홈" />
      <NavItem icon={AtSignIcon} label="차량정보" />
      <NavItem icon={AtSignIcon} label="혜택" />
      <NavItem icon={AtSignIcon} label="이용내역" />
      <NavItem icon={AtSignIcon} label="내 정보" />
    </Flex>
  );
}

export default BottomNavBar;
