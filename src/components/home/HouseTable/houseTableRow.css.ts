import { createVar, style } from '@vanilla-extract/css';

import { vars } from '@styles/theme.css';

export const backgroundColor = createVar();

export const trStyle = style({
  background: backgroundColor,
  borderBottom: '1px solid rgb(229, 231, 235)',
});

export const tdStyle = style({
  padding: '1rem 1.4rem',
});

export const homepageTdStyle = style([
  tdStyle,
  {
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
]);

export const homepageUlStyle = style({
  listStylePosition: 'inside',
});

export const homepageLiStyle = style({
  '::marker': {
    content: '📍 ',
  },
});

export const linkStyle = style({
  color: vars.color.main,

  ':hover': { textDecoration: 'underline' },
});

export const createdAtTdStyle = style([
  tdStyle,
  {
    whiteSpace: 'nowrap',
  },
]);

export const favoriteBtnStyle = style({
  padding: '0.8rem',
});
