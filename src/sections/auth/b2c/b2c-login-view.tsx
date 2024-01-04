import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN_PHONE } from 'src/config-global';

import FormProvider, { RHFPhoneField } from 'src/components/hook-form';


// ----------------------------------------------------------------------

export default function B2cLoginView() {
  const {loginPhone} = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    phone: ''
  };

  const methods = useForm({
    // resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      await loginPhone?.(data.phone);

      router.push(PATH_AFTER_LOGIN_PHONE);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{mb: 5}}>
      <Typography variant="h4">Вход</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body1" color="text.disabled">Если вы ещё не регистрировались, то это произойдет автоматически</Typography>

        {/* <Link component={RouterLink} href={paths.auth.b2c.login} variant="subtitle2"> */}
        {/*  Create an account */}
        {/* </Link> */}
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      {/* <RHFTextField name="email" label="Email address" /> */}
      <RHFPhoneField name="phone" label="Номер телефона" />

      {/* <RHFTextField */}
      {/*  name="password" */}
      {/*  label="Password" */}
      {/*  type={password.value ? 'text' : 'password'} */}
      {/*  InputProps={{ */}
      {/*    endAdornment: ( */}
      {/*      <InputAdornment position="end"> */}
      {/*        <IconButton onClick={password.onToggle} edge="end"> */}
      {/*          <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} /> */}
      {/*        </IconButton> */}
      {/*      </InputAdornment> */}
      {/*    ), */}
      {/*  }} */}
      {/* /> */}

      <LoadingButton
        fullWidth
        color="primary"
        sx={{color: 'white'}}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Продолжить
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {/* <Alert severity="info" sx={{ mb: 3 }}> */}
      {/*  Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong> */}
      {/* </Alert> */}

      {renderForm}
    </FormProvider>
  );
}
