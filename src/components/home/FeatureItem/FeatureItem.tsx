import {
  containerStyle,
  descriptionStyle,
  iconWrapperStyle,
  textWrapperStyle,
  titleStyle,
} from './FeatureItem.css';

import { vars } from '@styles/theme.css';

export interface Feature {
  title: string;
  description: string;
  Icon: any;
}

const FeatureItem = (props: Feature) => {
  const { title, description, Icon } = props;

  return (
    <li className={containerStyle}>
      <div className={iconWrapperStyle}>
        <Icon width={24} height={24} fill={vars.color.main} />
      </div>
      <div className={textWrapperStyle}>
        <h4 className={titleStyle}>{title}</h4>
        <p className={descriptionStyle}>{description}</p>
      </div>
    </li>
  );
};

export default FeatureItem;
