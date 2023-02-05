import Head from "next/head";
import { Inter } from "@next/font/google";
import { Text, Center, Button, VStack } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  function button() {
    if (session) {
      return (
        <Button
          colorScheme="red"
          onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
        >
          Sign out
        </Button>
      );
    } else {
      return (
        <NextLink href="/auth/signin">
          <Button colorScheme="blue">Sign in</Button>
        </NextLink>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <h2 className={inter.className}>
          <VStack>
            <Text as="b">Home</Text>
            `${button()}`
          </VStack>
        </h2>
      </Center>
    </>
  );
}
