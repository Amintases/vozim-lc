import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';


// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
};
function matchIsNumeric(value:string) {
  console.log(value)
  const isNumber = typeof parseInt(value, 10) === 'number'
  return isNumber && !Number.isNaN(Number(value))
}

export default function RHFCode({ name, ...other }: RHFCodesProps) {
  const { control } = useFormContext();

  const validateChar = (value:string, index:number) => matchIsNumeric(value)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput
            {...field}
            autoFocus
            validateChar={validateChar}
            gap={1.5}
            length={4}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />

          {/* {error && ( */}
          {/*  <FormHelperText sx={{ px: 2 }} error> */}
          {/*    {error.message} */}
          {/*  </FormHelperText> */}
          {/* )} */}
        </div>
      )}
    />
  );
}
