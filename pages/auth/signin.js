import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    await signIn("credentials", { ...data, redirect: false })
      .then((res) => {
        if (res.ok) router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Center>
      <VStack spacing="8" mt="8">
        <Heading as="h2" size="3xl" noOfLines={1}>
          Welcome back!
        </Heading>

        <Box
          m="16"
          p="4"
          w="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <form method="POST" onSubmit={handleSubmit}>
            <VStack spacing="4">
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="text" name="email" required />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" required />
              </FormControl>
              <FormControl>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </FormControl>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Center>
  );
}
