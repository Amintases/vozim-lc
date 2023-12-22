import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({disabledLink = false, sx, ...other}, ref) => {
    // const theme = useTheme();

    // const PRIMARY_LIGHT = theme.palette.primary.light;
    //
    // const PRIMARY_MAIN = theme.palette.primary.home;
    //
    // const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 107,
          height: 17,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg width="100%" height="100%" viewBox="0 0 108 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5883 9C16.5883 13.6944 12.8749 17.5 8.29412 17.5C3.71341 17.5 0 13.6944 0 9C0 4.30559 3.71341 0.5 8.29412 0.5C12.8748 0.5 16.5883 4.30559 16.5883 9Z"
            fill="#FFA45B" />
          <path
            d="M35.8121 9C35.8121 13.6944 32.0987 17.5 27.518 17.5C22.9373 17.5 19.2239 13.6944 19.2239 9C19.2239 4.30559 22.9373 0.5 27.518 0.5C32.0987 0.5 35.8121 4.30559 35.8121 9Z"
            fill="#69D9E2" />
          <path d="M38.4478 0.5H41.4149L45.3641 11.7192L49.4361 0.5H52.2191L46.3668 15.3471H44.1363L38.4478 0.5Z"
                fill="black" />
          <path
            d="M54.8547 8.36481C54.8547 7.17671 55.0457 6.09671 55.4277 5.12479C55.8094 4.15334 56.3383 3.32493 57.0136 2.63984C57.6888 1.95494 58.4936 1.42712 59.4282 1.05649C60.3624 0.68625 61.389 0.500759 62.5078 0.500759C63.64 0.487082 64.6768 0.658159 65.6181 1.01455C66.5593 1.37111 67.3709 1.89201 68.0532 2.57691C68.7354 3.26199 69.2672 4.08675 69.6491 5.05144C70.031 6.01613 70.222 7.09273 70.222 8.2809C70.222 9.44138 70.031 10.4969 69.6491 11.4474C69.2672 12.3984 68.7354 13.2162 68.0532 13.901C67.3709 14.5861 66.5593 15.1209 65.6181 15.5053C64.6768 15.8896 63.64 16.0888 62.5078 16.1029C61.389 16.1029 60.3624 15.9175 59.4282 15.5472C58.4936 15.177 57.6888 14.6526 57.0136 13.9745C56.3383 13.2965 55.8094 12.4823 55.4277 11.5313C55.0457 10.5809 54.8547 9.52536 54.8547 8.36481ZM57.5558 8.19698C57.5558 8.99388 57.6751 9.7278 57.9139 10.3988C58.1524 11.0701 58.4901 11.6502 58.9269 12.1394C59.3632 12.6289 59.8851 13.0134 60.4922 13.2928C61.0991 13.5726 61.7778 13.7122 62.5282 13.7122C63.2783 13.7122 63.9606 13.5726 64.5745 13.2928C65.1884 13.0134 65.7134 12.6289 66.1501 12.1394C66.5865 11.6502 66.924 11.0701 67.1627 10.3988C67.4014 9.7278 67.5214 8.99388 67.5214 8.19698C67.5214 7.45612 67.4014 6.76409 67.1627 6.12097C66.924 5.47804 66.5865 4.91516 66.1501 4.43278C65.7134 3.95052 65.1884 3.57301 64.5745 3.30045C63.9606 3.02782 63.2783 2.89141 62.5282 2.89141C61.7778 2.89141 61.0991 3.02782 60.4922 3.30045C59.8851 3.57301 59.3632 3.95052 58.9269 4.43278C58.4901 4.91516 58.1524 5.47804 57.9139 6.12097C57.6751 6.76409 57.5558 7.45612 57.5558 8.19698Z"
            fill="black" />
          <path
            d="M72.8574 12.9565L80.5918 2.8906H72.9801V0.5H83.8049V2.8906L76.0082 12.9565H83.9276V15.3471H72.8574V12.9565Z"
            fill="black" />
          <path d="M89.1412 0.5H86.5632V15.3471H89.1412V0.5Z" fill="black" />
          <path
            d="M91.7769 0.5H95.7054L99.5729 10.9013L103.481 0.5H107.369V15.3471H104.914V3.01647H104.873L100.473 15.3471H98.6725L94.2732 3.01647H94.2321V15.3471H91.7769V0.5Z"
            fill="black" />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{display: 'contents'}}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
