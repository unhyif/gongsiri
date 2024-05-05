import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const layoutStyle = style({
  width: 'min(100%, 1200px)',
  margin: '0 auto',
});

export const containerStyle = style([
  layoutStyle,
  {
    padding: '4.8rem 2.4rem',
  },
]);

export const contactStyle = style({
  color: vars.color.main,
  fontSize: '1.4rem',
  fontWeight: 500,
  textAlign: 'right',
  marginBottom: '4rem',
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
