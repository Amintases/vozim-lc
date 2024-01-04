import { Helmet } from 'react-helmet-async';

// import { JwtLoginView } from 'src/sections/auth/jwt';
import { B2cCodeView } from 'src/sections/auth/b2c';

// ----------------------------------------------------------------------

export default function CodePage() {
  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>

      <B2cCodeView />
    </>
  );
}
