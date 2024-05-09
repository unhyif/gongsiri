import { recipe } from '@vanilla-extract/recipes';

export const guideStyle = recipe({
  base: {
    position: 'fixed',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'max-content',
    display: 'flex',
    gap: '0.6rem',
    alignItems: 'center',
    fontSize: '1.5rem',
    background: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '12px',
    transition: '0.3s all ease-in-out',
  },
  variants: {
    isFading: {
      true: {
        opacity: 0,
      },
    },
  },
});
