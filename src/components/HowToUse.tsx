import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// MotionBox for animation
const MotionBox = motion(Box);

const HowToUse = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible1(true);
        } else {
          setIsVisible1(false);
        }
      },
      { threshold: 0.1 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible2(true);
        } else {
          setIsVisible2(false);
        }
      },
      { threshold: 0.1 }
    );

    const observer3 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible3(true);
        } else {
          setIsVisible3(false);
        }
      },
      { threshold: 0.1 }
    );

    const observer4 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible4(true);
        } else {
          setIsVisible4(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref1.current) {
      observer1.observe(ref1.current);
    }
    if (ref2.current) {
      observer2.observe(ref2.current);
    }
    if (ref3.current) {
      observer3.observe(ref3.current);
    }
    if (ref4.current) {
      observer4.observe(ref4.current);
    }

    return () => {
      if (ref1.current) {
        observer1.unobserve(ref1.current);
      }
      if (ref2.current) {
        observer2.unobserve(ref2.current);
      }
      if (ref3.current) {
        observer3.unobserve(ref3.current);
      }
      if (ref4.current) {
        observer4.unobserve(ref4.current);
      }
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <MotionBox
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible1 ? 1 : 0, y: isVisible1 ? 0 : 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        display="flex"
        justifyContent={{ base: "center", md: "flex-end" }} // Mobilde ortala, daha geniş ekranlarda sağa hizala
        alignItems="center"
        minHeight="100%"
        width="100%"
        p={{ base: 4, md: 10 }} // Mobilde padding'i küçült
        mt={10}
      >
        <Image
          src="/images/0.png"
          alt="Instruction1"
          boxSize={{ base: "80%", md: "50%" }} // Mobilde daha küçük boyut
          objectFit="contain"
          boxShadow="dark-lg"
          borderRadius={10}
        />
      </MotionBox>

      <MotionBox
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible2 ? 1 : 0, y: isVisible2 ? 0 : 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        display="flex"
        justifyContent={{ base: "center", md: "flex-start" }} // Mobilde ortala, daha geniş ekranlarda sola hizala
        alignItems="center"
        minHeight="100%"
        width="100%"
        p={{ base: 4, md: 10 }} // Mobilde padding'i küçült
        mt={10}
      >
        <Image
          src="/images/1.png"
          alt="Instruction2"
          boxSize={{ base: "80%", md: "50%" }} // Mobilde daha küçük boyut
          objectFit="contain"
          boxShadow="dark-lg"
          borderRadius={10}
        />
      </MotionBox>

      <MotionBox
        ref={ref3}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible3 ? 3 : 0, y: isVisible3 ? 0 : 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        display="flex"
        justifyContent={{ base: "center", md: "flex-end" }} // Mobilde ortala, daha geniş ekranlarda sağa hizala
        alignItems="center"
        minHeight="100%"
        width="100%"
        p={{ base: 4, md: 10 }} // Mobilde padding'i küçült
        mt={10}
      >
        <Image
          src="/images/2.png"
          alt="Instruction3"
          boxSize={{ base: "80%", md: "50%" }} // Mobilde daha küçük boyut
          objectFit="contain"
          boxShadow="dark-lg"
          borderRadius={10}
        />
      </MotionBox>

      <MotionBox
        ref={ref4}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible4 ? 1 : 0, y: isVisible4 ? 0 : 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        display="flex"
        justifyContent={{ base: "center", md: "flex-start" }} // Mobilde ortala, daha geniş ekranlarda sola hizala
        alignItems="center"
        minHeight="100%"
        width="100%"
        p={{ base: 4, md: 10 }} // Mobilde padding'i küçült
        mt={10}
      >
        <Image
          src="/images/3.png"
          alt="Instruction4"
          boxSize={{ base: "80%", md: "50%" }} // Mobilde daha küçük boyut
          objectFit="contain"
          boxShadow="dark-lg"
          borderRadius={10}
        />
      </MotionBox>
    </Box>
  );
};

export default HowToUse;
