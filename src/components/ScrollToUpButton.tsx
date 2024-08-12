import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      position="fixed"
      bottom="50px"
      right="50px"
      onClick={scrollToTop}
      display={isVisible ? 'flex' : 'none'}
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      backgroundColor="blue.500"
      color="white"
      _hover={{ backgroundColor: 'blue.600' }}
      boxShadow="md"
      zIndex="1000"
    >
      <ArrowUpIcon w={6} h={6} />
    </Button>
  );
};

export default ScrollToTopButton;
