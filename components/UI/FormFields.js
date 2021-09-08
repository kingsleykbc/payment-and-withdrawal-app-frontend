import React, { useState } from 'react';
import classnames from 'classnames';
import { Field, ErrorMessage } from 'formik';
import theme from '../../config/theme';

import IcView from 'react-icons/lib/md/visibility';
import IcViewOff from 'react-icons/lib/md/visibility-off';
import IcDropDown from 'react-icons/lib/md/keyboard-arrow-down';

export const FormikTextField = ({
	name,
	type,
	label,
	value,
	onChange,
	maxLength,
	onKeyPress,
	hasError,
	placeholder,
	isRegularInput,
	showPasswordToggle,
	disabled,
	autoComplete,
	errorMessage,
	...fieldViewProps
}) => {
	/**
	 * PASSWORD TOGGLE
	 */
	let [inputType, setInputType] = useState(type === 'password' && 'password');
	const toggleShowPassword = () => setInputType(inputType === 'password' ? 'text' : 'password');

	/**
	 * GET INPUT CONFIG
	 */
	const formInputType = type === 'password' ? inputType : type ? type : 'text';
	const formInputIcon = showPasswordToggle !== false ? type === 'password' && (inputType === 'text' ? <IcViewOff /> : <IcView />) : null;

	const fieldProps = {
		type: formInputType,
		name: name,
		disabled: disabled,
		onKeyPress: onKeyPress,
		maxLength: maxLength,
		autoComplete,
		placeholder: placeholder,
		className: classnames({ hasError })
	};
	const inputFieldProps = { value, onChange };

	// =======================================================================
	//  UI
	// =======================================================================
	return (
		<FormFieldView
			{...fieldViewProps}
			label={label}
			inputIcon={formInputIcon}
			onInputIconClick={type === 'password' && toggleShowPassword}
			inputSection={
				<div className='wrapper'>
					{isRegularInput ? (
						type === 'textarea' ? (
							<textarea {...inputFieldProps} {...fieldProps} />
						) : (
							<input {...inputFieldProps} {...fieldProps} />
						)
					) : (
						<Field component={type === 'textarea' ? 'textarea' : 'input'} {...fieldProps} />
					)}
				</div>
			}
			errorSection={!isRegularInput ? <ErrorMessage name={name} render={msg => <h5>{msg}</h5>} /> : errorMessage && <h5>{errorMessage}</h5>}
		/>
	);
};

/**
 * SELECT FIELD
 */
export const FormikSelect = ({
	label,
	name,
	children,
	value,
	disabled,
	onChange,
	hasError,
	placeholder,
	isRegularInput,
	errorMessage,

	...fieldViewProps
}) => {
	// =======================================================================
	//  UI
	// =======================================================================
	return (
		<FormFieldView
			{...fieldViewProps}
			label={label}
			background='none'
			inputIcon={<IcDropDown />}
			disableInputIcon
			inputSection={
				<div className='wrapper'>
					{isRegularInput ? (
						<select
							name={name}
							value={value}
							onChange={onChange}
							placeholder={placeholder}
							disabled={disabled}
							className={classnames({ hasError })}
						>
							{children}
						</select>
					) : (
						<Field component='select' name={name} disabled={disabled} className={classnames({ hasError })}>
							{children}
						</Field>
					)}
				</div>
			}
			errorSection={!isRegularInput ? <ErrorMessage name={name} render={msg => <h5>{msg}</h5>} /> : errorMessage && <h5>{errorMessage}</h5>}
		/>
	);
};

/**
 * FORMIK CHECKBOX
 */
export const FormikCheckButton = ({ label, name, type, value, onChange, margin, checked, isRegularInput, disabled }) => {
	margin = margin || '0 20px 0 0';

	const fieldProps = {
		name,
		value,
		disabled,
		checked,
		type: type === 'radio' ? 'radio' : 'checkbox',
		className: classnames({
			checkBox: !type || type === 'checkbox',
			radioBox: type === 'radio',
			switch: type === 'switch'
		})
	};

	// ================================================================================================
	//  UI
	// ================================================================================================
	return (
		<div className='field'>
			<label>
				{isRegularInput ? <input {...fieldProps} onChange={onChange} /> : <Field {...fieldProps} />}
				<span>{label}</span>
			</label>

			{/* STYLE */}
			<style jsx>{`
				.field {
					display: inline-block;
					cursor: pointer !important;
					margin: ${label ? margin : 0};
				}

				label {
					cursor: pointer;
          display: flex;
          align-items: center;
				}

        span {
          margin-left: 15px;
          margin-top: -5px;
        }
			`}</style>
		</div>
	);
};

/**
 * THE WRAPPER FOR THE FORM FIELD
 */
const FormFieldView = ({
	label,
	inputSection,
	errorSection,
	errorAlignment,
	margin,
	autoWidth,
	inputWidth,
	tip,
	allowResize,
	textareaHeight,
	iconColor,

	labelFontWeight,
	labelColor,
	labelFontSize,
	background,

	leadingIcon,
	inputIcon,
	onInputIconClick,
	disableInputIcon,
	borderType
}) => {
	/**
	 * GET CSS
	 */
	margin = margin || '0 0 15px 0';
	errorAlignment = errorAlignment || 'left';
	inputWidth = inputWidth ? inputWidth : autoWidth ? 'auto' : '100%';
	labelFontWeight = labelFontWeight || 'bold';
	labelColor = labelColor || theme.colors.textColor;
	labelFontSize = labelFontSize || '0.9rem';
	background = background || theme.colors.backgroundColor;
	textareaHeight = textareaHeight || '120px';
	iconColor = iconColor || theme.colors.lightText;

	const paddingLeft = leadingIcon ? '40px' : '12px';
	const inputIconIndex = disableInputIcon ? '-1' : '5';
	const resize = allowResize ? 'vertical' : 'none';

	// =======================================================================
	//  UI
	// =======================================================================
	return (
		<div className='formField'>
			<h4>{label}</h4>

			<div className='inputSection'>
				{leadingIcon && <div className='leadingIcon'>{leadingIcon}</div>}
				{inputSection}
				{inputIcon && (
					<div className='fieldIcon' onClick={onInputIconClick}>
						{inputIcon}
					</div>
				)}
			</div>

			{tip && <div className='tip'>{tip}</div>}

			<div className='errorSection'>{errorSection}</div>

			{/* STYLE */}
			<style jsx>{`
				h4 {
					font-size: ${labelFontSize};
					color: ${labelColor};
					font-weight: ${labelFontWeight};
					margin-left: 5px;
					text-align: left;
				}

				.formField {
					margin: ${margin};
					z-index: 1;
				}

				.formField :global(input),
				.formField :global(select),
				.formField :global(textarea) {
					width: ${inputWidth};
					padding-left: ${paddingLeft} !important;
					background: ${background};
					${(borderType === 'underline' || borderType === 'none') &&
					`
            padding: 20px ${paddingLeft} !important;
            border: none !important;
            border-radius: 0 !important;
            border-bottom: 1px solid ${borderType === 'underline' ? theme.colors.borderColor : 'transparent'} !important;
          `};
				}

				.formField :global(select) {
					height: auto;
				}

				.formField :global(textarea) {
					padding: 12px 15px !important;
					resize: ${resize};
					height: ${textareaHeight};
				}

				.formField :global(h5) {
					padding-left: 5px;
				}

				.tip {
					font-size: 0.8rem;
					margin-bottom: 8px;
					color: ${theme.colors.lightText};
				}

				.inputSection {
					margin: 10px 0;
					position: relative;
					z-index: 1;
				}

				.fieldIcon,
				.leadingIcon {
					position: absolute;
					right: 10px;
					top: calc(50% - 17px);
					cursor: pointer;
					padding: 4px;
					font-size: 1.3em;
					color: ${theme.colors.lightText};
					z-index: ${inputIconIndex};
				}

				.leadingIcon {
					left: 5px;
					z-index: 1;
					max-width: 10px;
				}

				.fieldIcon :global(svg *),
				.leadingIcon :global(svg *) {
					fill: ${iconColor};
				}

				.fieldIcon:hover,
				.fieldIcon:hover :global(svg *) {
					fill: ${theme.colors.textColor} !important;
				}

				.errorSection {
					text-align: ${errorAlignment};
				}
			`}</style>
		</div>
	);
};

/**
 * INPUT FIELD
 */
export const InputField = props => <FormikTextField {...props} isRegularInput />;

/**
 * INPUT CHECKBOX
 */
export const InputCheckButton = props => <FormikCheckButton {...props} isRegularInput />;

/**
 * INPUT SELECT
 */
export const InputSelect = props => <FormikSelect {...props} isRegularInput />;
