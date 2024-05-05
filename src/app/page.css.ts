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
  marginBottom: '1.6rem',
});

export const contactStyle = style({
  color: vars.color.main,
  fontSize: '1.5rem',
  fontWeight: 500,
  alignSelf: 'flex-end',
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

export const tableWrapperStyle = style({
  overflowX: 'auto',
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
