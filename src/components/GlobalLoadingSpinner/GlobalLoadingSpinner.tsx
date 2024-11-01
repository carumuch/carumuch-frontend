'use client';

import { Center, Spinner } from '@chakra-ui/react';
import useLoadingStore from '@/stores/useLoadingStore';

function GlobalLoadingSpinner() {
  const isLoading = useLoadingStore((state) => state.isLoading); // Zustand로 로딩 상태 추적

  return isLoading ? (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(0,0,0,0.3)"
      zIndex="9999"
    >
      <Spinner size="xl" color="white" />
    </Center>
  ) : null;
}

export default GlobalLoadingSpinner;
