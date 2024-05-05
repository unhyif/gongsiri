import { style } from '@vanilla-extract/css';
import { vars } from '@styles/theme.css';

export const containerStyle = style({
  display: 'flex',
  gap: '1.2rem',
});

export const iconWrapperStyle = style({
  flexShrink: 0,
});

export const textWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const titleStyle = style({
  fontSize: '1.5rem',
  fontWeight: 600,
});

export const descriptionStyle = style({
  color: vars.color.gray,
  fontSize: '1.4rem',
  lineHeight: 1.4,
  whiteSpace: 'pre-wrap',
});
