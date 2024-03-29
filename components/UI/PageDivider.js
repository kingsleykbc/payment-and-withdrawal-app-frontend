import React from 'react';
import theme from '../../config/theme';

const PageDivider = ({ label, children, fontSize, edgeSpacing, labelPosition, vPadding, borderWidth, borderColor }) => {
	/**
	 * GET CSS
	 */
	edgeSpacing = edgeSpacing || '20px';
	label = label || children;
	fontSize = fontSize || '1rem';

	const left = labelPosition === 'center' ? 'calc(50% - 10px)' : labelPosition === 'right' ? 'auto' : edgeSpacing;
	const right = labelPosition === 'right' ? edgeSpacing : 'auto';

	// ===================================================================================================================
  //  UI
  // ===================================================================================================================
	return (
		<div className='PageDivider'>
			{label && <h4 className='label'>{label}</h4>}
			<hr />

			{/* STYLE */}
			<style jsx>{`
				.PageDivider {
					position: relative;
					padding: ${vPadding || '22px'} 0;
				}

				.label {
					position: absolute;
					top: calc(50% - 10px);
					display: inline-block;
					padding: 0 10px;
					background: #353535;
					font-size: ${fontSize};
					left: ${left};
					right: ${right};
					color: #adadad;
				}

				.PageDivider :global(hr) {
					border: none;
					border-top: 1px solid #000;
				}
			`}</style>
		</div>
	);
};

export default PageDivider;
