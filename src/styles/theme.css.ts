import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    main: '#5DBE3F',
    black: 'rgb(23, 23, 23)',
    lightGray: 'rgb(243, 244, 246)',
    midGray: 'rgb(175, 179, 187)',
    gray: 'rgb(107, 114, 128)',
    blue: '#0070f3',
  },
});
