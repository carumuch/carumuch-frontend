'use client';

import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';
import { useRouter, usePathname } from 'next/navigation';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isSelected, onClick }: NavItemProps) {
  return (
    <Box textAlign="center" position="relative" onClick={onClick}>
      <IconButton
        aria-label={label}
        icon={<Box as={icon} w={6} h={6} />}
        variant="ghost"
        color={isSelected ? 'blue.600' : 'gray.600'} // 활성화된 경우 흰색으로
        _hover={{ bg: 'gray.700', color: 'white' }}
      />
      <Text fontSize="sm" color={isSelected ? 'blue.600' : 'gray.600'} mt={1}>
        {label}
      </Text>
    </Box>
  );
}

function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (href: string) => {
    router.push(href);
  };

  return (
    <>
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
        <NavItem
          icon={AtSignIcon}
          label="메인"
          isSelected={pathname.startsWith('/main')}
          onClick={() => handleSelect('/main')}
        />
        <NavItem
          icon={AtSignIcon}
          label="수리입찰"
          isSelected={pathname.startsWith('/repair')}
          onClick={() => handleSelect('/repair')}
        />
        <NavItem
          icon={AtSignIcon}
          label="커뮤니티"
          isSelected={pathname.startsWith('/community')}
          onClick={() => handleSelect('/community')}
        />
        <NavItem
          icon={AtSignIcon}
          label="입찰관리"
          isSelected={pathname === '/bid'}
          onClick={() => handleSelect('/bid')}
        />
        <NavItem
          icon={AtSignIcon}
          label="내 정보"
          isSelected={pathname.startsWith('/profile')}
          onClick={() => handleSelect('/profile')}
        />
      </Flex>
      <Flex
        as="nav"
        // position="fixed"
        bottom="0"
        width="100%"
        maxW="400px"
        bg="white"
        borderTop="1px solid"
        borderColor="gray.200"
        justifyContent="space-around"
        alignItems="center"
        paddingY={2}
        // zIndex="1000"
        mx="auto"
      >
        <NavItem
          icon={AtSignIcon}
          label="메인"
          isSelected={pathname.startsWith('/main')}
          onClick={() => handleSelect('/main')}
        />
        <NavItem
          icon={AtSignIcon}
          label="수리입찰"
          isSelected={pathname.startsWith('/repair')}
          onClick={() => handleSelect('/repair')}
        />
        <NavItem
          icon={AtSignIcon}
          label="커뮤니티"
          isSelected={pathname.startsWith('/community')}
          onClick={() => handleSelect('/community')}
        />
        <NavItem
          icon={AtSignIcon}
          label="입찰관리"
          isSelected={pathname === '/bid'}
          onClick={() => handleSelect('/bid')}
        />
        <NavItem
          icon={AtSignIcon}
          label="내 정보"
          isSelected={pathname.startsWith('/profile')}
          onClick={() => handleSelect('/profile')}
        />
      </Flex>
    </>
  );
}

export default BottomNavBar;
