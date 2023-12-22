import { Helmet } from 'react-helmet-async';

// import OneView from 'src/sections/one/view';
import HomeView from "../../sections/home/view/home-view";
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Главная</title>
      </Helmet>

      <HomeView />
    </>
  );
}
