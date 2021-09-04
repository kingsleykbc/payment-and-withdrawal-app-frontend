import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from './Lightbox';
import AddOrUpdateFieldValue from './OTPComponents/AddOrUpdateFieldValue';
import AuthenticateField from './OTPComponents/AuthenticateField';
import Snackbar from './Snackbar';

class OTP extends Component {
	onVerify;
	onAuthenticate;
	snackbarRef = React.createRef();

	// STATE
	state = { show: false, view: '' };

	// SET VIEW
	setView = view => this.setState({ view });

	// TOGGLE LB
	toggle = () => this.setState({ show: !this.state.show });

	// SEND OTP
	sendOTP = async ({ onVerify, onAuthenticate }) => {
		this.onVerify = onVerify;
		this.onAuthenticate = onAuthenticate;

		const {
			authContext: { userData },
			field
		} = this.props;
		this.setState({ view: userData[field] ? 'AuthenticateField' : 'AddOrUpdateFieldValue' });
		this.toggle();
	};

	// HANDLE CODE VALIDATION
	handleValidateOTP = async () => {
		// Handle on verify and on auth here (with the conditions and everything)

		this.toggle();
		this.snackbarRef.current.openSnackbar({ message: 'Handled successfully', type: 'success' });
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	render() {
		const { show, view } = this.state;
		let { title, type, field } = this.props;
		title = title || type === 'authentication' ? 'Authenticate account' : `Verify ${field}`;

		return (
			<>
				<Lightbox show={show} toggle={this.toggle} showCancelButton={false} isFixed={this.isFixed} width='500px' autoHeight>
					<h3>{title}</h3>

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
	title: PropTypes.string,
	subTitle: PropTypes.string,
	trailingMessage: PropTypes.any
};
