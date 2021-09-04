import React from 'react';
import { Text } from './TextComponents';
import theme from '../../config/theme';

const TextButton = ({ children, label, disabled, disabledColor, isLightText, color, onClick, padding, ...props }) => {
	color = disabled ? disabledColor || theme.colors.lightText : isLightText ? theme.colors.lightText : color || theme.colors.primaryColor;
	label = label || children;

	// =======================================================================
	//  UI
	// =======================================================================
	return (
		<span className='TextButton' onClick={disabled ? () => {} : onClick}>
			<Text {...props} color={color}>
				{label}
			</Text>

			{/* STYLE */}
			<style jsx>{`
				.TextButton {
					display: inline-block;
					padding: ${padding || '0'};
					cursor: pointer;
					color: ${color};
				}

				.TextButton:hover {
					text-decoration: underline;
				}
			`}</style>
		</span>
	);
};

export default TextButton;
