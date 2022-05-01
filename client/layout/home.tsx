import { Anchor, AppShell, Box, Group, Header, Navbar } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UploadVideo from '../components/UploadVideo';
import { useMe } from '../context/me';
import { VideosContextProvider } from '../context/videos';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { user, refetch } = useMe();

  return (
    <VideosContextProvider>
      <AppShell
        padding='md'
        navbar={
          <Navbar width={{ base: 300 }} height={500} p='xs'>
            Side items
          </Navbar>
        }
        header={
          // TODO define header somewhere else so we can
          // use it in multiple layouts
          <Header height={60} p='xs'>
            <Group>
              <Box>
                <Image src='/logo.png' alt='logo' width='100px' height='40px' />
              </Box>

              {user ? (
                <>
                  <UploadVideo />
                </>
              ) : (
                <>
                  <Link href='/auth/login' passHref>
                    <Anchor>Login</Anchor>
                  </Link>
                  <Link href='/auth/register' passHref>
                    <Anchor>Register</Anchor>
                  </Link>
                </>
              )}
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </VideosContextProvider>
  );
}

export default HomePageLayout;
