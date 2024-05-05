import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const tableStyle = style({
  borderCollapse: 'collapse',
  textAlign: 'center',
});

export const thStyle = style({
  background: vars.color.main,
  color: 'white',
  padding: '1.2rem 1.6rem',
  fontWeight: 'inherit',
});
