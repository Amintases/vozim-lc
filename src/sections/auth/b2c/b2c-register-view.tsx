import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import FormProvider, { RHFCheckbox } from 'src/components/hook-form';

import { PATH_AFTER_LOGIN } from "../../../config-global";
import RegisterIcon from "../../../assets/icons/register-icon";
import RHFTextField from "../../../components/hook-form/rhf-text-field";
// ----------------------------------------------------------------------

export default function B2cLoginView() {
  const {register} = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const CodeSchema = Yup.object().shape({
    name: Yup.string().required("Поле имя обязательно"),
    checkbox: Yup.bool().oneOf([true], ''),
  });

  const defaultValues = {
    name: '',
    checkbox: false
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

  const onSubmit = handleSubmit(async (data: { name: string, checkbox?: boolean }) => {
    console.log(data)
    try {
      await register?.(data.name);

      router.push(PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });


  const renderHead = (
    <Stack spacing={2} sx={{mb: 5}}>
      <Box sx={{textAlign: 'center'}}>
        <RegisterIcon sx={{width: 96, height: 96, mb: 1}}/>
        {/* <PasswordIcon sx={{width: 96, height: 96, mb: 1}} /> */}
        <Typography sx={{mb: 1}} variant="h3">Познакомимся?</Typography>
      </Box>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{mb: 2}}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="name" label="Имя" />
      <RHFCheckbox style={{marginLeft: '1px'}} name="checkbox" label="Согласен с пользовательским соглашением" />
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

      {renderForm}

    </FormProvider>
  );
}
