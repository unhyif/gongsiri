import ArrowsRight from '@assets/svgs/arrows_right.svg';
import { guideStyle } from './HouseTableGuide.css';

interface Props {
  isShown: boolean;
  isFading: boolean;
  onFadeOut: () => void;
}

const HouseTableGuide = (props: Props) => {
  const { isShown, isFading, onFadeOut } = props;

  if (!isShown) return null;
  return (
    <div className={guideStyle({ isFading })} onTransitionEnd={onFadeOut}>
      옆으로 스크롤 할 수 있어요
      <ArrowsRight width={14} height={14} fill="white" />
    </div>
  );
};

export default HouseTableGuide;
