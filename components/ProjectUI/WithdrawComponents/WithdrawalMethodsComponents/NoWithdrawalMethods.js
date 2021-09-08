import React from 'react';
import PlaceholderBox from '../../../UI/PlaceholderBox';
import Spacing from '../../../UI/Spacing';
import { Text } from '../../../UI/TextComponents';

const NoWithdrawalMethods = () => {
  return (
    <PlaceholderBox> 
      <Text isBold fontSize="1.2rem">No withdrawal methods</Text>
      <Spacing>
        <Text isLightText>Please add and select withdrawal method to receive funds.</Text>
      </Spacing>
    </PlaceholderBox>
  );
};

export default NoWithdrawalMethods;