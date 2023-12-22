import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { MotivationIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

// import AppWidget from '../app-widget';
import HomeWelcome from '../home-welcome';
import HomeFeatured from '../home-featured';
import { _appInvoices } from "../../../_mock";
import HomeNewInvoice from "../home-new-invoice";
import HomeWidgetSummary from "../home-widget-summary";

// import { _appFeatured } from 'src/_mock';

const _appFeatured = [
  {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    "name": "Доставкавка в Казахстан",
    "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg"
  },
  {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
    "name": "Доставкавка в Россию",
    "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg"
  },

]

// ----------------------------------------------------------------------

export default function HomeView() {
  // const {user} = useMockedUser();

  // const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <HomeWelcome
            title={`Москва - Минск \n за 1 день`}
            description="Перевозка между пунктами выдачи со скидкой"
            img={<MotivationIllustration />}
            action={
              <Button variant="contained" color="primary" sx={{color: 'white'}}>
                Оформить
              </Button>
            }
          />
        </Grid>
        <Grid xs={12} md={4}>
          <HomeFeatured  list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <HomeWidgetSummary
            title="Количество заявок"
            total={29}
            unit="amount"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <HomeWidgetSummary
            title="Общий вес"
            total={32}
            unit="kg"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <HomeWidgetSummary
            title="Общий объем"
            total={1.25}
            unit="size"
          />
        </Grid>

        <Grid xs={12}>
          <HomeNewInvoice
            title="Поледение отправления"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'description', label: 'Описание' },
              { id: 'id', label: 'Номер' },
              { id: 'date', label: 'Дата доставки' },
              { id: 'direction', label: 'Направление' },
              { id: 'status', label: 'Статус' },
              { id: '' },
            ]}
          />
        </Grid>

      </Grid>

    </Container>
  );
}
