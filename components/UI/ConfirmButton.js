import React from 'react';
import Button from './Button';
import WithAreYouSureBox from './WithAreYouSureBox';

const ConfirmButton = ({ onYes, onClick, message, title, ...buttonProps }) => (
  <WithAreYouSureBox onYes={onYes || onClick} message={message} title={title}>
    <Button {...buttonProps} />
  </WithAreYouSureBox>
);

export default ConfirmButton;