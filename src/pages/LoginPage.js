import { useNavigate, Navigate } from 'react-router-dom';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Button } from '@mui/material';

import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import Iconify from '../components/iconify';



const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


export default function LoginPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }

    });
    Navigate('/app');
    console.log(googleSignIn);
  }


  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to DigiLeads
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => googleSignIn()}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}