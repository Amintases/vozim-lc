// ----------------------------------------------------------------------
import { Controller, useFormContext } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel  } from "mui-tel-input";

import { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
  label: string;
};

export default function RHFPhoneField({ name, label, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{validate: matchIsValidTel}}
      render={({ field, fieldState}) => (
        <MuiTelInput
          {...field}
          label={label}
          defaultCountry="RU"
          onlyCountries={["RU", "BY", "KZ"]}
          forceCallingCode
          helperText={
            fieldState.invalid
              ? "Ошибка в поле номер телефона"
              : ""
          }
          error={fieldState.invalid}

        />
      )}
    />
  );
}
