import React from 'react';
import theme from '../../../config/theme';
import Spacing from '../../UI/Spacing';
import { Text } from '../../UI/TextComponents';

const NoPaymentMethod = () => {
  return (
    <div>
      <Text isBold isLightText fontSize="1.1rem"> No Payment Method</Text>
      <Spacing />
      <Text isLightText> Please add one</Text>

      { /* STYLE */}
      <style jsx>{`
        div {
          height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 5px;
          width: 92.5vw;
          border: 2px dashed ${theme.colors.borderColor};
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default NoPaymentMethod;