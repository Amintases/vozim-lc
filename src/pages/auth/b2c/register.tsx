import { Helmet } from 'react-helmet-async';

import { B2cRegisterView } from 'src/sections/auth/b2c';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>

      <B2cRegisterView />
    </>
  );
}
