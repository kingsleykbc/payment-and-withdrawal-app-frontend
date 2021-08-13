import React from 'react';
import ClickableIcon from '../../../UI/ClickableIcon';
import Spacing from '../../../UI/Spacing';
import { Text } from '../../../UI/TextComponents';
import IcDelete from 'react-icons/lib/md/delete';
import { CARD_ICONS } from '../../../../utils/icons';
import IcBank from 'react-icons/lib/md/account-balance';

const PaymentMethod = ({ category, onRemove, onSelect, isSelected, data: { last4, card_type } }) => {
	let icon;

	switch (category) {
		case 'card':
			icon = CARD_ICONS[card_type.trim()] || CARD_ICONS['other'];
			break;
		case 'bank':
			icon = <IcBank />;
			break;
	}

	// ================================================================================================
	//  UI
	// ================================================================================================
	return (
		<div className='PaymentMethod'>
			{/* DETAILS */}
			<div className='content' onClick={onSelect}>
				<div className='icon'>{icon}</div>

				<Spacing padding='0 15px'>
					<Text isBold color='#fff'>
						**** {last4}
					</Text>
					<br />
					<Text isSmallText color='#cfcfcf'>
						{category}
					</Text>
				</Spacing>
			</div>

			{/* DELETE BUTTON */}
			<div className='delIcon'>
				<ClickableIcon onClick={onRemove} color='#fff' icon={<IcDelete />} />
			</div>

			{/* STYLE */}
			<style jsx>{`
				.PaymentMethod {
					display: flex;
					flex-grow: 1;
					flex-basis: 48%;
					max-width: 48%;
					align-items: center;
					border: 2px solid #232323;
					border-radius: 5px;
					cursor: pointer;
					margin: 10px 5px;
					padding: 8px 12px;
					background: ${isSelected ? '#000' : 'none'};
				}

				.icon {
					min-width: 48px;
					font-size: 2rem;
					padding-bottom: 5px;
					vertical-align: middle;
					text-align: center;
				}

				.icon :global(svg *) {
					fill: #999999;
				}

				.PaymentMethod .content {
					display: flex;
					flex-grow: 1;
					align-items: center;
				}

				.PaymentMethod:hover {
					background: ${isSelected ? '#000' : '#232323'};
				}

				@media screen and (max-width: 800px){
				.PaymentMethod {
					max-width: 100%;
					flex-basis: 90%;
				}
			`}</style>
		</div>
	);
};

export default PaymentMethod;
