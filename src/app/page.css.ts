import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const layoutStyle = style({
  width: 'min(100%, 1200px)',
  margin: '0 auto',
});

export const mainStyle = style([
  layoutStyle,
  {
    padding: '4.8rem 0',
  },
]);

export const introStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  padding: '0 2.4rem',
});

export const serviceStyle = style({
  display: 'flex',
  gap: '1.6rem',
  alignItems: 'center',
  color: vars.color.main,
  fontSize: '1.4rem',
  fontWeight: 500,
  alignSelf: 'flex-end',
});

export const bcfStyle = style({
  background: '#f4e1be',
  color: vars.color.black,
  padding: '0.8rem 1.2rem',
  borderRadius: '2rem',
});

export const titleWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  alignItems: 'center',
});

export const titleStyle = style({
  fontSize: '4.8rem',
});

export const descriptionStyle = style({
  color: vars.color.gray,
});

export const featureListStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1.6rem',
  marginTop: '1rem',

  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
});

export const topAdfitArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  alignItems: 'center',
});

export const topAdfit = recipe({
  base: {
    height: '9rem',
  },
  variants: {
    isMobile: {
      true: {
        height: '10rem',
      },
    },
  },
});

export const adNotice = style({
  color: vars.color.midGray,
  fontSize: '1.1rem',
});

export const updatedDateStyle = style({
  fontSize: '1.4rem',
  color: vars.color.midGray,
  alignSelf: 'flex-end',
});

export const tableWrapperStyle = style({
  overflowX: 'auto',
  margin: '1.6rem 0 4rem 0',
});

export const bottomAdfitArea = style({
  padding: '0 2.4rem',
  height: '25rem',
});

export const footerStyle = style({
  background: vars.color.lightGray,
});

export const footerInsideStyle = style([
  layoutStyle,
  {
    height: '8.8rem',
    padding: '0 2.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: vars.color.gray,
  },
]);
