import React from 'react';
import IcBank from 'react-icons/lib/md/account-balance';
import theme from '../../../config/theme';
import { Text } from '../../UI/TextComponents';
import Spacing from '../../UI/Spacing';
import ClickableIcon from '../../UI/ClickableIcon';
import IcDelete from 'react-icons/lib/md/delete';

const BankPayment = ({ accountbank, accountnumber, isSelected, onSelect, onRemove }) => {
	const backgroundColor = isSelected ? theme.colors.primaryColor : `#fff`;
	const textColor = isSelected ? '#fff' : '#000';
	const secondaryTextColor = isSelected ? '#fff' : theme.colors.lightText;
	const delIconColor = isSelected ? 'rgba(255, 255, 255, 0.4)' : 'rgba(43, 45, 79, 0.2)';

	// ================================================================================================
	//  UI
	// ================================================================================================
	return (
		<div className='BankPayment'>
			<div className='delIcon'>
				<ClickableIcon onClick={onRemove} color={delIconColor} icon={<IcDelete />} />
			</div>

			<div className='content' onClick={onSelect}>
				<Spacing padding='0 0 10px 0'>
					<IcBank className='icon' />
				</Spacing>
				<Text color={textColor} isBold>{`** ** ** ** ${accountnumber.slice(-2)}`}</Text>
				<Text isSmallText color={secondaryTextColor}>
					{accountbank}
				</Text>
			</div>

			{/* STYLE */}
			<style jsx>{`
				.BankPayment {
					position: relative;
					width: 170px;
					height: 120px;
					margin-right: 10px;
				}

				.BankPayment .content {
					height: 120px;
					background: ${backgroundColor};
					border-radius: 5px;
					box-shadow: ${theme.boxShadows.medShadow};
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					cursor: pointer;
				}

				.BankPayment:hover {
					opacity: ${isSelected ? '1' : '0.7'};
				}

				.BankPayment :global(.icon) {
					font-size: 1.3rem;
					fill: ${secondaryTextColor} !important;
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

export default BankPayment;
