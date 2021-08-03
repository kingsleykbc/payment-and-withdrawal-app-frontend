import React from 'react';
import theme from '../../../config/theme';
import ClickableIcon from '../../UI/ClickableIcon';
import Container from '../../UI/Container';
import { Row } from '../../UI/Flex';
import Spacing from '../../UI/Spacing';
import { Text } from '../../UI/TextComponents';
import IcDelete from 'react-icons/lib/md/delete';

const OtherPayment = ({ cardno, onRemove, onSelect, isSelected, expiryyear, expirymonth, cardtype }) => {
  const backgroundColor = isSelected ? theme.colors.primaryColor : `#fff`;
  const textColor = isSelected ? "#fff" : "#000";
  const secondaryTextColor = isSelected ? "#fff" : theme.colors.lightText;
  const delIconColor = isSelected ? "rgba(255, 255, 255, 0.4)" : "rgba(43, 45, 79, 0.2)";

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <div className="OtherPayment">
      <div className="delIcon">
        <ClickableIcon onClick={onRemove} color={delIconColor} icon={<IcDelete />} />
      </div>

      <div className="content" onClick={onSelect}>
        <Text isBold color={secondaryTextColor} isSmallText>{cardtype}</Text>
        <Spacing padding="10px 0">
          <Row justify="space-between">
            <Text isBold color={textColor} fontSize="1.1rem">****</Text>
            <Text isBold color={textColor} fontSize="1.1rem">****</Text>
            <Text isBold color={textColor} fontSize="1.1rem">****</Text>
            <Text isBold color={textColor}>{cardno.slice(-4)}</Text>
          </Row>
        </Spacing>
        <Container width="35px" borderRadius="4px" height="23px" background={delIconColor} />
      </div>

      { /* STYLE */}
      <style jsx>{`
        .OtherPayment {
          position: relative;
          width: 200px;
          height: 120px;
          margin-right: 10px;
        }

        .OtherPayment {
          height: 120px;
          background: ${backgroundColor};
          border-radius: 5px;
          box-shadow: ${theme.boxShadows.medShadow};
          padding:10px 15px;
          cursor: pointer;
        }

        .OtherPayment:hover {
          opacity: ${isSelected ? "1" : "0.7"};
        }

        .delIcon {
          position: absolute;
          right: 5px;
          top: 5px;
        }

        .delIcon :global(.iconCover) {
          width: 30px;
          height: 30px;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default OtherPayment;