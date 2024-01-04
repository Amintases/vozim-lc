import Stack from '@mui/material/Stack';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthFullScreenLayout({ children }: Props) {

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

      }}
    >
      {children}
    </Stack>
  );

  return (
    <>
      {renderLogo}
      <Stack
        justifyContent="center"
        alignItems="center"
        component="main"
        direction="row"
        sx={{
          minHeight: '100vh',
        }}
      >


        {renderContent}

      </Stack>
    </>

  );
}
