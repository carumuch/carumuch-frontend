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
        _hover={{ bg: 'gray.700', color: 'white' }}
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
      maxW="400px"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      justifyContent="space-around"
      alignItems="center"
      paddingY={2}
      zIndex="1000"
      mx="auto"
    >
      <NavItem icon={AtSignIcon} label="메인" />
      <NavItem icon={AtSignIcon} label="수리입찰" />
      <NavItem icon={AtSignIcon} label="커뮤니티" />
      <NavItem icon={AtSignIcon} label="입찰관리" />
      <NavItem icon={AtSignIcon} label="내 정보" />
    </Flex>
  );
}

export default BottomNavBar;
