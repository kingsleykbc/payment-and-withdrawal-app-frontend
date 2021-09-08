import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from './Lightbox';
import AddOrUpdateFieldValue from './OTPComponents/AddOrUpdateFieldValue';
import AuthenticateField from './OTPComponents/AuthenticateField';
import Snackbar from './Snackbar';
import ErrorView from './OTPComponents/ErrorView';

class OTP extends Component {
	onValidate;
	snackbarRef = React.createRef();

	/**
	 * STATE
	 */
	state = { show: false, view: '' };

	/**
	 * UPDATE VIEW
	 * @param {'AuthenticateField' | 'AddOrUpdateFieldValue' } view
	 */
	setView = view => this.setState({ view });

	/**
	 * TOGGLE LB
	 */
	toggle = () => this.setState({ show: !this.state.show });

	/**
	 * OPEN THE OTP LB AND SEND THE CODE
	 *
	 * @param {{onValidate}} config
	 */
	sendOTP = async (config = {}) => {
		const { onValidate } = config;
		this.onValidate = onValidate;

		const {
			field,
			type,
			authContext: {
				userData,
				userData: { phoneNumber, isPhoneVerified, email, isVerified }
			}
		} = this.props;

		// Set the default view based on the current info
		if (type === 'verification') {
			// If user hasn't previously entered the field being validated, take them to the input form
			this.setState({ view: userData[field] ? 'AuthenticateField' : 'AddOrUpdateFieldValue' });
		} else {
			// If user hasn't previously entered or verified the field being authenticated, show error
			const noError = field === 'email' ? email && isVerified : phoneNumber && isPhoneVerified;
			this.setState({ view: noError ? 'AuthenticateField' : 'ErrorView' });
		}

		this.toggle();
	};

	/**
	 * SHOW SUCCESS MESSAGE
	 */
	showSnackbarMessage = () => {
		const { type, field, snackbarRef } = this.props;

		const message =
			type === 'verification' ? `${field === 'email' ? 'Email' : 'Phone number'} successfully verified` : 'Authentication successful';

		// Use external REF (if exists)
		const ref = snackbarRef || this.snackbarRef;
		ref.current.openSnackbar({ message, type: 'success' });
	};

	/**
	 * ON SUCCESSFUL CODE VALIDATION
	 */
	handleValidateOTP = async () => {
		const {
			field,
			unmountedAfterUse,
			authContext: { userData }
		} = this.props;

		this.showSnackbarMessage();
		if (!unmountedAfterUse) this.toggle();
		if (this.onValidate) this.onValidate({ [field]: userData[field] });
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	render() {
		const { show, view } = this.state;
		let { title, type, field, authContext } = this.props;
		title = title || type === 'authentication' ? 'Authenticate account' : `Verify ${field}`;

		if (!authContext.userData._id) return 'Loading...';
		return (
			<>
				<Lightbox show={show} toggle={this.toggle} showCancelButton={false} isFixed={this.isFixed} width='500px' autoHeight>
					<h3>{title}</h3>
					{view === 'ErrorView' && <ErrorView {...this.props} />}
					{view === 'AddOrUpdateFieldValue' && <AddOrUpdateFieldValue setView={this.setView} {...this.props} />}
					{view === 'AuthenticateField' && (
						<AuthenticateField onValidateOTP={this.handleValidateOTP} setView={this.setView} {...this.props} />
					)}
				</Lightbox>
				<Snackbar ref={this.snackbarRef} />

				{/* STYLE */}
				<style jsx>{`
					h3 {
						text-align: center;
					}
				`}</style>
			</>
		);
	}
}

export default OTP;

OTP.defaultProps = {
	type: 'authentication'
};

OTP.propTypes = {
	type: PropTypes.oneOf(['verification', 'authentication']),
	field: PropTypes.oneOf(['email', 'phoneNumber']).isRequired,
	authContext: PropTypes.object.isRequired,
	allowFieldChange: PropTypes.bool,
	unmountedAfterUse: PropTypes.bool,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	trailingMessage: PropTypes.any,
	snackbarRef: PropTypes.any
};
