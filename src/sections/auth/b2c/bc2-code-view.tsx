import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';

import FormProvider from 'src/components/hook-form';

import { paths } from "../../../routes/paths";
import Iconify from "../../../components/iconify";
import SentIcon from "../../../assets/icons/sent-icon";
import { RouterLink } from "../../../routes/components";
import RHFCode from "../../../components/hook-form/rhf-code";
// ----------------------------------------------------------------------

export default function B2cLoginView() {
  const {loginCode, resendCode} = useAuthContext();
  const phone = sessionStorage.getItem('phone')

  const [errorMsg, setErrorMsg] = useState('');

  const CodeSchema = Yup.object().shape({
    code: Yup.string().required(""),
  });

  const defaultValues = {
    code: ''
  };

  const methods = useForm({
    resolver: yupResolver(CodeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;
  const onSubmit = handleSubmit(async (data: { code: string }) => {

    try {
      await loginCode?.(data.code);

    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });


  const [seconds, setSeconds] = useState(0);
  // переменные для отображения времени в минутах и секундах
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(Math.ceil(seconds % 60)).padStart(2, "0");


  // логика таймера - вычетание секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => Math.max(s - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // обновление таймера, повторная отправка смс
  const handleClick = async () => {
    setSeconds(90);
    resendCode?.()
  };

  const renderHead = (
    <Stack spacing={2} sx={{mb: 5}}>
      <Box sx={{textAlign: 'center'}}>
        <SentIcon sx={{width: 96, height: 96, mb: 1}} />
        <Typography sx={{mb: 1}} variant="h3">Введите код из СМС</Typography>
        <Typography color="text.secondary" variant="body2">Мы отправили вам 4-х значиный код на номер</Typography>
        <Typography variant="subtitle2">
          {phone}
        </Typography>
      </Box>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{mb: 2}}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFCode name="code" />

      <LoadingButton
        fullWidth
        color="primary"
        sx={{color: 'white'}}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Вход
      </LoadingButton>
    </Stack>
  );


  const renderTimer = (
    <Stack direction={{xs: 'column', sm: 'row'}} mb={2} spacing={0.5} justifyContent='center'>

      <Typography align="center" variant="body2">Не получили код?</Typography>

      {seconds === 0 && (
        <Typography align="center" sx={{cursor: 'pointer'}} color="primary" onClick={handleClick} variant="subtitle2">
          Отправить повторно
        </Typography>
      )}
      {seconds !== 0 && (
        <Typography align="center" color="text.secondary" variant="body2">
          Отправить повторно через {minutesString}:{secondsString}
        </Typography>
      )}


    </Stack>

  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}

      {renderTimer}

      <Stack direction="row" alignItems="center" justifyContent="center">
        <Iconify
          width={16}
          className="arrow"
          icon="eva:arrow-ios-back-fill"
        />
        <Link color="text.primary" component={RouterLink} href={paths.auth.b2c.login} variant="subtitle2">
          Назад
        </Link>
      </Stack>

    </FormProvider>
  );
}
