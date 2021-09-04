import React from 'react';
import PageDivider from './PageDivider';
import theme from '../../config/theme';

const SectionContent = ({ children, vPadding, hPadding, maxWidth, hasShadow, label, alignment }) => {
	return (
		<div className='sectionContent'>
			<div className='view'>
				{label && <PageDivider label={label} vPadding='25px' />}
				{children}
			</div>

			{/* STYLE */}
			<style jsx>{`
				.sectionContent .view {
					margin: auto;
					border-radius: 5px;
				}
			`}</style>

			<style jsx>{`
				.sectionContent {
					padding: ${vPadding || '20px'} ${hPadding || '20px'};
				}

				.sectionContent .view {
					text-align: ${alignment || 'left'};
					max-width: ${maxWidth || '900px'};
					box-shadow: ${hasShadow ? theme.boxShadows.medShadow : 'none'};
					padding: ${hasShadow ? '20px' : '0'};
				}

				@media screen and (max-width: 800px) {
					.sectionContent {
						padding: ${vPadding || '12px'} ${hPadding || '15px'};
					}

					.sectionContent .view {
						padding: ${hasShadow ? '10px' : '0'};
					}
				}
			`}</style>
		</div>
	);
};

export default SectionContent;
