import { Box } from "@chakra-ui/react";

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
   return (
      <Box mt={5} mx="auto" maxW="1000px" w="100%" bgColor="red.200">
         {children}
      </Box>
   );
};
