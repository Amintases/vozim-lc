import { Helmet } from 'react-helmet-async';

// import { JwtLoginView } from 'src/sections/auth/jwt';
import { B2cLoginView } from 'src/sections/auth/b2c';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Авторизация</title>
      </Helmet>

       <B2cLoginView />
    </>
  );
}
