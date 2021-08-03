import React, { useState } from 'react';
import theme from '../../config/theme';
import Align from './Align';
import Button from './Button';
import CardTypeIcon from './CreditCardInputComponents/CardTypeIcon';
import { Row } from './Flex';
import { InputField } from './FormFields';
import Spacing from './Spacing';
import Tooltip from './Tooltip';
import _ from 'lodash';

const CreditCardInput = ({ maxCvv = 3, onSave }) => {
  const [cardType, setCardType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardno, setCardno] = useState("");
  const [cardname, setCardname] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState({});

  /**
   * ON CHANGE CARD NUMBER
   */
  const onChangeCardNo = ({ target: { value } }) => {
    setCardno(cc_format(value));
    setCardType(getCardType(value));
  }

  /**
   * ON CHANGE DATE
   */
  const onChangeExpiryDate = ({ target: { value } }) => setExpiryDate(cc_formatDate(value));

  /**
   * VALIDATE
   */
  const isValid = () => {
    const e = {};
    if (!cardno || cardno.length < 16) e.cardno = "Enter valid card number";
    if (!expiryDate) e.expiryDate = "Enter expiry date";
    if (!cvv) e.cvv = "Enter CVV";
    if (!cardname) e.cardname = "Enter card name";
    setError(e);

    return _.isEmpty(e);
  }

  /**
   * HANDLE SAVE CARD 
   */
  const handleSave = () => {
    if (!isValid()) return;
    const data = {
      cardtype: cardType,
      cardno: cardno.replace(/\s+/g, ''),
      cvv,
      cardname,
      expirymonth: expiryDate.split("/")[0],
      expiryyear: expiryDate.split("/")[1]
    }

    if (onSave) onSave(data);
  }

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <div className="CreditCardInput">

      {/* CARD NO */}
      <div className="cnInput">
        <InputField
          label="Card Number"
          value={cardno}
          autoComplete="cc-number"
          placeholder="0000 0000 0000 0000"
          onChange={onChangeCardNo}
          errorMessage={error.cardno}
        />
        <CardTypeIcon type={cardType} />
      </div>

      <Row wrapOnlyResponsive>

        {/* EXPIRY DATE */}
        <InputField
          label="Card Expiry"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={onChangeExpiryDate}
          errorMessage={error.expiryDate}
        />

        <Spacing isInline />

        {/* CVV */}
        <div className="cnInput second">
          <InputField
            label="CVV"
            placeholder="000"
            name="cvv"
            maxLength={maxCvv}
            value={cvv}
            onChange={({ target: { value } }) => setCvv(value)}
            errorMessage={error.cvv}
          />
          <Tooltip position="left" width="150px" label={`${maxCvv}-digit code behind your card`} />
        </div>
      </Row>

      {/* CARD HOLDER NAME */}
      <InputField
        label="Name on card"
        placeholder="John Okafor"
        value={cardname}
        onChange={({ target: { value } }) => setCardname(value)}
        errorMessage={error.cardname}
      />

      {/* SUBMIT */}
      <Align> <Button onClick={handleSave} filled hasShadow>Save Card</Button> </Align>

      { /* STYLE */}
      <style jsx>{`
        h4 {
          padding-left: 5px;
          padding-bottom: 10px;
        }

        .cnInput {
          position: relative;
        }

        .cnInput.second {
          margin-top: -10px;
          flex-grow: 1;
        }

        .CreditCardInput :global(.CardTypeIcon), .CreditCardInput :global(.Tooltip) {
          position: absolute;
          right: 10px;
          top: 35px;
          z-index: 10000;
        }

        .CreditCardInput :global(.Tooltip) {
          color: ${theme.colors.lightText};
          top: 38px;
        }
      `}</style>
    </div>
  );
};

export default CreditCardInput;

// ================================================================================================
//  VALIDATIONS
// ================================================================================================

/**
 * FORMAT CREDIT CARD NUMBER
 */
function cc_format(value) {
  value = value.replace(/\D/g, '');
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g);
  let match = matches && matches[0] || ''
  let parts = []

  for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4))

  if (parts.length) return parts.join(' ');
  else return value
}

/**
 * FORMAT CREDIT CARD DATE
 */
function cc_formatDate(string) {
  return string.replace(
    /[^0-9]/g, '' // To allow only numbers
  ).replace(
    /^([2-9])$/g, '0$1' // To handle 3 > 03
  ).replace(
    /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^0{1,}/g, '0' // To handle 00 > 0
  ).replace(
    /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
  );
}

/**
 * GET CARD TYPE
 */
function getCardType(number) {

  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null) return "VISA";

  // Mastercard
  re = new RegExp("^5[1-5]");
  if (number.match(re) != null) return "Mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) return "AMEX";

  // Discover
  re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if (number.match(re) != null) return "Discover";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null) return "Diners";

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null) return "Diners - Carte Blanche";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null) return "JCB";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null) return "Visa Electron";

  return "";
}