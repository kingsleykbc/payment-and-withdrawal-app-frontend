import React from 'react';
import classnames from 'classnames';
import IcBank from 'react-icons/lib/md/account-balance';
import IcMore from 'react-icons/lib/md/more';
import Container from '../../../UI/Container';
import theme from '../../../../config/theme';
import { Row } from '../../../UI/Flex';
import TextButton from '../../../UI/TextButton';
import Spacing from '../../../UI/Spacing';

const SelectType = ({ selectedType, setType, setView }) => {
	return (
		<Container hasBorder borderDirections='b' marginBottom='15px' paddingBottom='10px' className='SelectType'>
			<Spacing padding='0 0 15px 5px'>
				<Row justify='space-between' align='center'>
					<h3>Select type</h3>
					<TextButton onClick={() => setView('WithdrawalMethods')}> Back </TextButton>
				</Row>
			</Spacing>

			{/* BANK */}
			<div
				onClick={() => setType('paystack-recipient_nuban')}
				className={classnames({ type: true, isSelected: selectedType === 'paystack-recipient_nuban' })}
			>
				<div className='icon'>
					<IcBank />
				</div>
				Bank account
			</div>

			{/* CARd */}
			<div className={classnames({ type: true, disabled: true })}>
				<div className='icon'>
					<IcMore />
				</div>
				More coming soon
			</div>

			{/* STYLE */}
			<style jsx>{`
				.type {
					border: 2px solid #868686;
					display: inline-flex;
					border-radius: 5px;
					padding: 8px 15px;
					margin: 5px;
					align-items: center;
					transition: opacity linear 0.1s;
					font-weight: bold;
					cursor: pointer;
				}
				.type.disabled {
					cursor: unset;
				}
				.type:hover,
				.type.disabled {
					opacity: 0.5;
				}
				.icon {
					font-size: 1.3rem;
					vertical-align: middle;
					margin-right: 10px;
					margin-top: -3px;
				}
				.icon :global(svg) {
					fill: #868686;
				}

				.type.isSelected {
					background: ${theme.colors.primaryColor};
					border-color: ${theme.colors.primaryColor};
					color: #000;
				}
			`}</style>
		</Container>
	);
};

export default SelectType;
