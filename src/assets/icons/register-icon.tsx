import { memo } from 'react';

import { BoxProps } from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

function RegisterIcon({...other}: BoxProps) {

  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (

    <svg width="96px" height="96px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <mask id="mask0_296_3266" maskUnits="userSpaceOnUse" x="0" y="7" width="64" height="53">
          <path
            d="M58.9345 16.6644C50.7574 10.3778 42.8261 15.5013 33.9795 13.6898C25.069 11.8652 21.5189 5.78979 11.37 8.59417C2.37975 11.0783 -3.07525 21.038 1.867 29.3764C3.27537 31.7525 5.67462 33.5452 6.65512 36.2038C8.23675 40.4927 5.82925 43.7854 6.29887 48.0003C8.25037 65.5129 34.9956 58.7295 44.8368 53.2809C60.2705 44.7359 70.7115 25.7188 58.9345 16.6644Z"
            fill={PRIMARY_MAIN} />
        </mask>
        <g mask="url(#mask0_296_3266)">
          <path
            d="M58.9345 16.6644C50.7574 10.3778 42.8261 15.5013 33.9795 13.6898C25.069 11.8652 21.5189 5.78979 11.37 8.59417C2.37975 11.0783 -3.07525 21.038 1.867 29.3764C3.27537 31.7525 5.67462 33.5452 6.65512 36.2038C8.23675 40.4927 5.82925 43.7854 6.29887 48.0003C8.25037 65.5129 34.9956 58.7295 44.8368 53.2809C60.2705 44.7359 70.7115 25.7188 58.9345 16.6644Z"
            fill={PRIMARY_MAIN} />
        </g>
        <path opacity="0.08"
              d="M51.3966 10.297C50.9324 10.297 50.4683 10.1203 50.1149 9.76702C49.4083 9.0604 49.4083 7.91052 50.1149 7.20377C50.8216 6.49702 51.9716 6.49702 52.6782 7.20377C53.3848 7.91052 53.3848 9.06027 52.6782 9.76702C52.3249 10.1203 51.8608 10.297 51.3966 10.297ZM51.3967 7.92314C51.2526 7.92314 51.1086 7.97789 50.9989 8.08764C50.7797 8.30689 50.7797 8.66377 50.9989 8.88315C51.2182 9.1024 51.5751 9.10252 51.7944 8.88315C52.0137 8.6639 52.0137 8.30702 51.7944 8.08764C51.6847 7.97789 51.5407 7.92314 51.3967 7.92314Z"
              fill="#00A76F" />
        <path opacity="0.24"
              d="M54.54 16.4084C54.0759 16.4086 53.6118 16.2318 53.2584 15.8784C52.916 15.5361 52.7275 15.0809 52.7275 14.5968C52.7275 14.1127 52.916 13.6575 53.2584 13.3152C53.9649 12.6085 55.1148 12.6084 55.8215 13.3152C56.1639 13.6575 56.3524 14.1127 56.3524 14.5968C56.3524 15.0811 56.1639 15.5362 55.8214 15.8784C55.4684 16.2317 55.0042 16.4084 54.54 16.4084ZM54.54 14.0345C54.396 14.0345 54.2519 14.0893 54.1423 14.199C54.0359 14.3053 53.9775 14.4465 53.9775 14.5968C53.9775 14.7471 54.036 14.8883 54.1423 14.9946C54.3617 15.2139 54.7185 15.2139 54.9378 14.9946C55.0442 14.8883 55.1025 14.7471 55.1025 14.5968C55.1025 14.4465 55.044 14.3054 54.9378 14.199C54.8282 14.0893 54.6842 14.0345 54.54 14.0345Z"
              fill={PRIMARY_MAIN} />
        <path opacity="0.08"
              d="M13.1719 29.595C12.7078 29.595 12.2436 29.4182 11.8903 29.065C11.1837 28.3582 11.1837 27.2083 11.8903 26.5017C12.5969 25.7952 13.7469 25.7951 14.4536 26.5017C15.1602 27.2085 15.1602 28.3582 14.4536 29.065C14.1003 29.4182 13.6361 29.595 13.1719 29.595ZM13.1719 27.2211C13.0279 27.2211 12.8838 27.2758 12.7742 27.3856C12.5548 27.6048 12.5548 27.9617 12.7742 28.1811C12.9934 28.4005 13.3504 28.4003 13.5697 28.1811C13.7891 27.9618 13.7891 27.605 13.5697 27.3856C13.4601 27.2758 13.3161 27.2211 13.1719 27.2211Z"
              fill={PRIMARY_MAIN} />
        <path opacity="0.48"
              d="M12.3662 35.2127C12.2062 35.2127 12.0463 35.1517 11.9242 35.0297L11.1787 34.2842L10.4332 35.0297C10.1891 35.2737 9.79343 35.2737 9.5493 35.0297C9.30518 34.7855 9.30518 34.3898 9.5493 34.1458L10.7368 32.9583C10.9809 32.7143 11.3766 32.7143 11.6207 32.9583L12.8082 34.1458C13.0523 34.3899 13.0523 34.7857 12.8082 35.0297C12.6861 35.1515 12.5262 35.2127 12.3662 35.2127Z"
              fill={PRIMARY_MAIN} />
        <path opacity="0.24"
              d="M53.3525 53.3126C53.1925 53.3126 53.0326 53.2516 52.9105 53.1296L52.165 52.3841L51.4195 53.1296C51.1754 53.3736 50.7798 53.3736 50.5356 53.1296C50.2915 52.8855 50.2915 52.4897 50.5356 52.2457L51.7231 51.0582C51.9673 50.8142 52.3629 50.8142 52.607 51.0582L53.7945 52.2457C54.0386 52.4899 54.0386 52.8856 53.7945 53.1296C53.6724 53.2515 53.5125 53.3126 53.3525 53.3126Z"
              fill={PRIMARY_MAIN} />
        <path
          d="M48 32C48 40.8366 40.8364 48 32 48C23.1633 48 16 40.8366 16 32C16 23.1633 23.1633 16 32 16C40.8364 16 48 23.1633 48 32Z"
          fill={PRIMARY_LIGHT} />
        <path
          d="M36.2146 22.4116C36.0327 21.7085 35.2566 20.7117 32.3161 20.7117C27.7732 20.7117 27.1262 21.3845 25.9172 20.2227C24.8972 19.2424 24.2981 23.9602 25.6582 25.4585C25.0842 27.5806 25.5434 29.706 25.5434 29.706H38.3254C38.3252 29.706 39.3979 24.7412 36.2146 22.4116Z"
          fill="#B76E00" />
        <path
          d="M26.8336 29.9292C26.8336 29.9292 26.2825 28.9199 25.1805 28.9199C24.0784 28.9199 23.2976 33.7652 26.8336 32.9576V29.9292Z"
          fill="#FFE4D1" />
        <path
          d="M37.0352 29.9292C37.0352 29.9292 37.5862 28.9199 38.6882 28.9199C39.7905 28.9199 40.5711 33.7652 37.0352 32.9576V29.9292Z"
          fill="#FFE4D1" />
        <path
          d="M31.9345 23.4365C23.4911 23.4365 25.1054 37.2842 31.9345 37.2842C38.7633 37.2842 40.3778 23.4365 31.9345 23.4365Z"
          fill="#FFEFE4" />
        <path
          d="M28.893 21.9785C27.2754 22.0911 26.72 22.1298 25.9159 21.3572C25.393 20.8545 24.9813 21.8508 24.8871 23.1426C24.7572 21.3955 25.2455 19.5784 25.9159 20.2227C26.7201 20.9953 27.2755 20.9567 28.8935 20.8441C29.7085 20.7874 30.7931 20.7119 32.3148 20.7119C35.2555 20.7119 36.0316 21.7085 36.2133 22.4119C38.3463 23.9724 38.568 26.7144 38.4825 28.3555C38.3956 26.769 37.9064 24.7849 36.2133 23.5461C36.0316 22.8428 35.2555 21.8462 32.3148 21.8462C30.7928 21.8462 29.708 21.9217 28.893 21.9785Z"
          fill="#B76E00" />
        <path
          d="M26.1909 29.2415C26.1909 21.8726 31.934 22.683 31.934 22.683C31.934 22.683 37.6769 21.8726 37.6769 29.2415C37.6769 29.2415 36.954 26.1959 35.2949 25.3653C34.9405 25.1878 34.6891 25.298 34.2983 25.4693C33.8371 25.6714 33.1818 25.9586 31.934 25.9586C30.6861 25.9586 30.0308 25.6714 29.5696 25.4693C29.1788 25.298 28.9274 25.1878 28.573 25.3653C26.914 26.1959 26.1909 29.2415 26.1909 29.2415Z"
          fill="#B76E00" />
        <path
          d="M43.553 43.0699C43.1426 42.0643 42.3088 41.2582 41.2319 40.9042L36.0434 39.1993C35.5539 39.0384 35.2214 38.5836 35.2168 38.0682L35.1982 35.973C34.331 36.7538 33.2515 37.2377 31.989 37.2489C30.7268 37.2599 29.6389 36.795 28.7578 36.0299L28.7756 38.0516C28.7803 38.5748 28.4458 39.0409 27.9485 39.2042L22.762 40.9051C21.6875 41.2577 20.8545 42.0602 20.4424 43.0624C23.355 46.1048 27.4568 47.9999 32.0015 47.9999C36.542 47.9999 40.6406 46.108 43.553 43.0699Z"
          fill={PRIMARY_DARK} />
        <path
          d="M31.8096 43.7394C34.47 43.7394 36.7393 42.0695 37.6296 39.7211L36.042 39.1993C35.5525 39.0385 35.22 38.5834 35.2156 38.0682L35.197 35.973C34.3296 36.7538 33.2502 37.2377 31.9878 37.2489C30.7253 37.2599 29.6375 36.795 28.7566 36.0299L28.7744 38.0516C28.7791 38.5748 28.4446 39.0409 27.9473 39.2042L26.0332 39.8319C26.9521 42.1217 29.1912 43.7394 31.8096 43.7394Z"
          fill="#FFE4D1" />
        <path
          d="M32 17.25C40.627 17.25 47.6582 24.0784 47.9866 32.625C47.9946 32.4175 48 32.2095 48 32C48 23.1636 40.8364 16 32 16C23.1633 16 16 23.1636 16 32C16 32.2095 16.0051 32.4175 16.0132 32.625C16.3416 24.0784 23.3728 17.25 32 17.25Z"
          fill={PRIMARY_LIGHT} />
      </g>
      <defs>
        <linearGradient id="paint0_linear_296_3266" x1="43.8414" y1="68.4015" x2="70.1982" y2="12.921"
                        gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_296_3266">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>


  );
}

export default memo(RegisterIcon);