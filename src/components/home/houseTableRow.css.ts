import { style } from '@vanilla-extract/css';

export const trStyle = style({
  borderBottom: '1px solid rgb(229, 231, 235)',
});

export const tdStyle = style({
  padding: '1.2rem 1.6rem',
});

export const homePageTdStyle = style([
  tdStyle,
  {
    whiteSpace: 'pre-wrap',
  },
]);
