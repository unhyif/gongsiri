import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const trStyle = recipe({
  base: { borderBottom: '1px solid rgb(229, 231, 235)' },
  variants: {
    isActive: {
      true: {
        background: '#F1FDEB',
      },
    },
  },
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
    // TODO
    content: '📍 ',
  },
});

export const linkStyle = style({
  ':hover': { textDecoration: 'underline' },
});

export const homepageLinkStyle = style([
  linkStyle,
  {
    color: vars.color.main,
    fontSize: '1.5rem',
  },
]);

export const createdAtTdStyle = style([
  tdStyle,
  {
    width: '12.3rem',
    fontWeight: 600,
    whiteSpace: 'pre-line',
  },
]);

export const favoriteBtnStyle = style({
  padding: '0.8rem',
});
