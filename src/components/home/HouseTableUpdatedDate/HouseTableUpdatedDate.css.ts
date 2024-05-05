import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const updatedDateStyle = style({
  fontSize: '1.4rem',
  color: vars.color.midGray,
  alignSelf: 'flex-end',
});
