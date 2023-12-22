import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';



// ----------------------------------------------------------------------



export default function NavManager() {
  const {user} = useMockedUser();

  return (
    <Box sx={{px: 3, py: 3}}>
      <Box sx={{pb: 2}}>
        <Typography variant="overline" noWrap sx={{color: 'text.disabled', fontSize:11 }}>
          Персональный менеджер
        </Typography>
      </Box>
      <Stack sx={{position: 'relative', pb:2}} direction="row" spacing={2}>
        <Avatar src={user?.photoURL} alt={user?.displayName} sx={{width: 48, height: 48}} />

        <Box sx={{flexGrow: 1}} textAlign="left">
          <Typography variant="body2" noWrap sx={{color: 'text.disabled'}}>
            Александр
          </Typography>

          <Typography variant="subtitle2" noWrap>
            +375 (29) 6666-565
          </Typography>
        </Box>
      </Stack>

      <Button variant="outlined" href={paths.minimalUI} target="_blank" rel="noopener"
              startIcon={<img src="/assets/icons/navbar/ic_telegram.svg"  alt='telegram'/>}>
        Telegram
      </Button>
    </Box>
  );
}
