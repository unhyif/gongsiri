import { createVar, style } from '@vanilla-extract/css';

import { vars } from '@styles/theme.css';

export const backgroundColor = createVar();

export const trStyle = style({
  background: backgroundColor,
  borderBottom: '1px solid rgb(229, 231, 235)',
});

export const tdStyle = style({
  padding: '1.2rem 1.6rem',
});

export const homePageTdStyle = style([
  tdStyle,
  {
    whiteSpace: 'pre',
  },
]);

export const linkStyle = style({
  color: vars.color.main,
});

export const favoriteBtnStyle = style({
  padding: '0.8rem',
});
