import React from 'react';
import { PAYMENT_METHOD } from '../../../config/enums';
import { formattedDate } from '../../../utils/helpers/dateTime';
import { Flex, Row } from '../../UI/Flex';
import KeyValListItem from '../../UI/KeyValListItem';
import Section from '../../UI/Section';
import Spacing from '../../UI/Spacing';
import { IconText, Text } from '../../UI/TextComponents';
import IcPrint from 'react-icons/lib/md/print';
import Clickable from '../../UI/Clickable';
import Price from '../../UI/Price';

const PaymentDetails = ({ type, amount, receiptNo, transactionFee, purpose, date, method, reference }) => {
	return (
		<div id='payDets' className='PaymentDetails'>
			{/* AMOUNT AND RECEIPT NO */}
			<Row justify='space-between'>
				<Section title='Amount' titleFontWeight='bold'>
					<Price fontSize='1.5rem' price={amount} showCurrency />
				</Section>

				<Section title='Receipt No' titleFontWeight='bold'>
					<Text fontSize='1.5rem'>{receiptNo}</Text>
				</Section>
			</Row>

			{/* OTHER DETAILS */}
			<Spacing padding='25px 0'>
				<Text isLightText isBold>
					Summary
				</Text>

				<Row>
					{/* STATIC DETAILS (PRICE, TYPE, PURPOSE, DATE) */}
					<Flex span={1}>
						<div>
							<KeyValListItem item='Date' value={formattedDate(date, 'DD-MMM-YYYY hh:mm A')} />
							<KeyValListItem item='Type' value={type} />
							<KeyValListItem item='Purpose' value={purpose} />
						</div>
						<Spacing padding='20px 0 0 0'>
							<KeyValListItem item='Amount' value={`₦${amount}`} />
							<KeyValListItem item='Transaction fees' value={transactionFee} />
						</Spacing>
					</Flex>

					<Spacing padding='15px' />

					{/* DYNAMIC DETAILS (PAYMENT METHOD, REF, BILLING ADDRESS) */}
					<Flex span={1}>
						<div>
							<KeyValListItem item='Method' value={method} />
							{method !== PAYMENT_METHOD.PHYSICAL && <KeyValListItem item='Reference' value={reference} />}
						</div>
					</Flex>
				</Row>
			</Spacing>

			{/* OPTIONS */}
			<Clickable onClick={() => window.print()}>
				<IconText isSmallText icon={<IcPrint />}>
					Print
				</IconText>
			</Clickable>
		</div>
	);
};

export default PaymentDetails;
