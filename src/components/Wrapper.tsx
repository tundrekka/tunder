import { Box } from "@chakra-ui/react";

interface WrapperProps {
   variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
   return (
      <Box mt={8} mx="auto" 
         maxW={variant === 'regular' ? "1000px" : '400px'} 
         w="100%" bgColor="#414141"
         padding="3" borderRadius="sm"
      >
         {children}
      </Box>
   );
};
