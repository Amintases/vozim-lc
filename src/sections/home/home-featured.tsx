import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, CardContent } from "@mui/material";

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  coverUrl: string;
};

interface Props extends CardProps {
  list: ItemProps[];
}

export default function HomeFeatured({list, ...other}: Props) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        right: 20,
        bottom: 20,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel {...carousel.carouselSettings}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
  active?: boolean;
};

function CarouselItem({item, active}: CarouselItemProps) {
  const theme = useTheme();

  const {coverUrl, name} = item;

  const renderImg = (
    <Image
      alt={name}
      src={coverUrl}
      overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${
        theme.palette.grey[900]
      } 75%)`}
      sx={{
        width: 1,
        height: {xs: 280, xl: 320},
      }}
    />
  );

  return (
    <Box sx={{position: 'relative'}}>
      <CardContent
        sx={{
          left: 0,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{opacity: 0.48}}>
          Новинка
        </Typography>

        <Typography noWrap variant="h5" sx={{mt: 1, mb: 3}}>
          {name}
        </Typography>

        <Button color="primary" variant="contained" sx={{color: 'white'}}>
          Подробнее
        </Button>
      </CardContent>

      {renderImg}
    </Box>
  );
}
