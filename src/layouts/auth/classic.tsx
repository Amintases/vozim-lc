import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  subTitle?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title, subTitle }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={{xl:10, xs:5}}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        {subTitle && <Typography variant="h6" sx={{ maxWidth: 480, textAlign: 'center' }}>
          {subTitle}
        </Typography>}
      </Box>


      <Box
        component="img"
        alt="auth"
        src={image || "/assets/illustrations/auth/iphone.svg"}
        sx={{
          maxWidth: {
            xs: 120,
            md: 180,
            xl: 720,
          },
        }}
      />

      <Stack direction="row" spacing={2}>
        <Box
          component="img"
          alt="auth"
          src={image || "/assets/illustrations/auth/google_play.svg"}
        />
        <Box
          component="img"
          alt="auth"
          src={image || "/assets/illustrations/auth/app_store.svg"}
        />
        <Box
          component="img"
          alt="auth"
          src={image || "/assets/illustrations/auth/app_gallery.svg"}
        />

      </Stack>

    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}

      {renderContent}

      {mdUp && renderSection}


    </Stack>
  );
}
