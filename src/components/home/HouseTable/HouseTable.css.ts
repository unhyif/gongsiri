import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const updatedDateStyle = style({
  fontSize: '1.4rem',
  color: vars.color.gray,
  alignSelf: 'flex-end',
});

export const tableStyle = style({
  borderCollapse: 'collapse',
  textAlign: 'center',
});

export const thStyle = style({
  background: 'rgb(229, 231, 235)',
  padding: '1.2rem 1.6rem',
  fontWeight: 'inherit',
});