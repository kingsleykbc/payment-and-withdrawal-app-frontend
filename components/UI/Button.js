import React from 'react';
import classnames from 'classnames';
import theme from '../../config/theme';
import DotLoader from './DotLoader';
import CircularLoader from './CircularLoader';
import Container from './Container';

const Button = ({
	label,
	onClick,
	isLoading,
	rounded,
	disabled,
	borderRadius,
	icon,
	hasShadow,
	iconPosition,
	iconColor,
	className,
	fontWeight,
	type,
	filled,
	color,
	textColor,
	hoverColor,
	width,
	margin,
	slideDirection,
	loadingText,
	showTextOnLoad,
	hPadding,
	vPadding,
	children,
	buttonType,
	fontSize
}) => {
	label = label || children;
	rounded = false;

	/**
	 * INITIAL BUTTON COLOR
	 */
	color = color
		? color
		: buttonType === 'success'
		? theme.colors.successColor
		: buttonType === 'error' || buttonType === 'danger'
		? theme.colors.dangerColor
		: theme.colors.primaryColor;

	/**
	 * ANIMATION SLIDE POSITION
	 */
	const isVertical = slideDirection === 'top' || slideDirection === 'bottom';
	if (isVertical) crossOrigin = slideDirection === 'top' ? 'bottom: 0;' : 'top: 0;';

	/**
	 * ICON
	 */
	iconPosition = iconPosition || 'left';
	const iconMargin = !label ? '' : iconPosition === 'right' ? 'margin-left: 10px' : 'margin-right: 10px';
	const paddingLeft = icon && !isLoading && iconPosition != 'right' ? 'padding-left: 10px;' : '';

	/**
	 * BUTTON ACTION
	 */
	const loadingOrDisabled = isLoading || disabled;
	onClick = loadingOrDisabled ? null : onClick;

	/**
	 * OTHERS
	 */
	if (isLoading) filled = true;
	let buttonColor = disabled ? '#9c98b3' : color;
	rounded = rounded !== false;
	hoverColor = loadingOrDisabled ? buttonColor : hoverColor || '#000';
	borderRadius = rounded ? '60px' : borderRadius ? borderRadius : '5px';
	textColor = textColor ? textColor : filled ? '#000' : buttonColor;
	const backgroundColor = filled ? buttonColor : 'none';
	fontWeight = fontWeight || 'bold';
	fontSize = fontSize || '1rem';
	margin = margin || '0';
	let text = isLoading && loadingText ? loadingText : isLoading && !loadingText && !showTextOnLoad ? '' : label;

	const vP = vPadding || '8px';
	const hP = hPadding ? hPadding : !label ? '9px' : rounded ? '20px' : '17px';
	const padding = `${vP} ${hP}`;
	const cursor = disabled ? 'no-drop' : 'pointer';

	/**
	 * THE LOADER
	 */
	const loader = text ? (
		<Container marginRight='10px'>
			<CircularLoader singleBorder color='#000' size='1rem' light />
		</Container>
	) : (
		<DotLoader dotSize='10px' color='#000' />
	);

	// =======================================================================
	//  UI
	// =======================================================================
	return (
		<button type={type} disabled={loadingOrDisabled} className={classnames({ [className]: className })} onClick={onClick}>
			{icon && !isLoading && iconPosition === 'left' && <div className='icon'>{icon}</div>}
			{isLoading && loader}
			{text && text}
			{icon && !isLoading && iconPosition === 'right' && <div className='icon'>{icon}</div>}

			{/* STYLE ======================================================================================= */}
			<style jsx>{`
				button {
					outline: none;
					min-width: ${width || '0'};
					padding: ${padding};
					${paddingLeft}
					${!vPadding && 'padding-bottom: 9px;'}
          display: inline-flex;
					font-size: ${fontSize};
					justify-content: center;
					align-items: center;
					border-radius: ${borderRadius};
					cursor: ${cursor};
					transition: all linear 0.2s;
					position: relative;
					overflow: hidden;
					font-weight: ${fontWeight};
					color: ${textColor};
					margin: ${margin};
					background: ${backgroundColor};
					z-index: 1;
					border: 2px solid ${buttonColor};
					box-shadow: ${hasShadow ? `${theme.boxShadows.smallShadow}` : 'none'};
				}

				button:hover {
					color: #fff;
					border-color: ${hoverColor};
					background: ${hoverColor};
				}

				button .icon {
					${iconMargin}
				}

				button :global(svg) {
					font-size: 1.2em;
				}

				button :global(svg *) {
					fill: ${iconColor || textColor};
				}

				button:hover :global(svg *) {
					fill: ${loadingOrDisabled ? `${iconColor || textColor}` : `#fff`};
				}

				@media screen ${`and`} (max-width: 800px) {
					button:before {
						transition: none;
					}

					button:hover {
						color: ${textColor};
						border-color: ${buttonColor};
					}

					button:hover::before {
						display: none;
					}
				}
			`}</style>
		</button>
	);
};

export default Button;
