import React from 'react';
import NumberFormat from 'react-number-format';
import { COUNTRIES_MAP } from '../../utils/config';
import { Row } from '../UI/Flex';
import Spacing from '../UI/Spacing';
import { Text } from '../UI/TextComponents';

const Price = ({ price = '0', currency = 'NGN', showSymbol, showCurrency, salePrice, formerPriceProps, freeIfZero, ...textProps }) => {
	//
	// FORMAT VALUE (IF PRICE WAS PASSED WITH SYMBOL)
	if (['₦', '$'].indexOf(price[0]) !== -1) {
		price = price.substring(1);
		showSymbol = showSymbol !== false && !showCurrency;
	}

	// RETURN FREE PRICE
	if (price.toString().toLowerCase() === 'free' || (price === 0 && freeIfZero)) return <Text {...textProps}>FREE</Text>;

	// GET THE SYMBOL
	let symbol;
	for (const [key, value] of Object.entries(COUNTRIES_MAP)) {
		if (value.currency === currency) {
			symbol = showSymbol ? value.currencySymbol : showCurrency ? currency + ' ' : '';
			break;
		}
	}

	// SETUP NUMBER FORMATTER
	const DisplayPrice = ({ p }) => <NumberFormat displayType='text' value={p} prefix={symbol} thousandSeparator />;

	// RETURN SALE PRICE
	if (salePrice) {
		return (
			<Row isInline mobileWidth='auto'>
				<Text fontSize='0.85rem' {...textProps}>
					<DisplayPrice p={salePrice} />
				</Text>
				<Spacing>
					<Text decoration='line-through' fontSize='0.8rem' isLightText {...formerPriceProps}>
						<DisplayPrice p={price} />{' '}
					</Text>
				</Spacing>
			</Row>
		);
	}

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<Text {...textProps}>
			<DisplayPrice p={price} />
		</Text>
	);
};

export default Price;
