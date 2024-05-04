import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const containerStyle = style({
  padding: '4.8rem 2.4rem',
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
  width: 'fit-content',
});

export const updatedAtStyle = style({
  fontSize: '1.4rem',
  color: vars.color.gray,
  textAlign: 'right',
  margin: '4rem 0 1.6rem 0',
});

export const footerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2.4rem',
  height: '8.8rem',
  background: vars.color.lightGray,
  color: vars.color.gray,
});
