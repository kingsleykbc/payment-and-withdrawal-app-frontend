import React, { PureComponent } from 'react';
import Lightbox from './Lightbox';
import Container from './Container';
import { Par } from './TextComponents';
import theme from '../../config/theme';

class AreYouSureBox extends PureComponent {
	message = 'You are about to perform an action';
	yesLabel = 'Yes';
	title = 'Are you sure?';
	isFixed = false;
	onYes;

	state = { show: false };

	// TOGGLE LB
	toggle = () => this.setState({ show: !this.state.show });

	// OPEN ARE YOU SURE BOX
	openAreYouSureBox = ({ message, yesLabel, title, isFixed, onYes }) => {
		this.message = message || this.message;
		this.yesLabel = yesLabel || this.yesLabel;
		this.title = title || this.title;
		this.isFixed = isFixed || this.isFixed;
		this.onYes = onYes;

		this.toggle();
	};

	// HANDLE YES CLICK
	handleYesClick = () => {
		this.toggle();
		if (this.onYes) this.onYes();
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	render() {
		const { show } = this.state;

		return (
			<Lightbox
				show={show}
				toggle={this.toggle}
				showCancelButton={false}
				isFixed={this.isFixed}
				contentPadding='0'
				width='400px'
				autoHeight
			>
				<h3>{this.title}</h3>
				<div className='message'>
					<Par> {this.message} </Par>
				</div>

				<Container hasBorder borderDirections='t'>
					<div className='options'>
						<div className='option' onClick={this.toggle}>
							Cancel
						</div>
						<div className='option' onClick={this.handleYesClick}>
							{this.yesLabel}
						</div>
					</div>
				</Container>

				{/* STYLE */}
				<style jsx>{`
					h3 {
						padding: 18px;
						color: ${theme.colors.lightText};
						text-align: center;
						font-size: 1.1em;
					}
					.message {
						padding: 20px;
						padding-bottom: 30px;
						padding-top: 0;
						text-align: center;
					}

					.options {
						display: flex;
						align-items: center;
					}

					.option {
						flex-grow: 1;
						text-align: center;
						padding: 15px;
						cursor: pointer;
					}

					.option:hover {
						background: ${theme.colors.highlightColor};
					}

					.option:last-child {
						font-weight: bold;
						border-left: 1px solid ${theme.colors.borderColor};
						color: ${theme.colors.primaryColor};
					}
				`}</style>
			</Lightbox>
		);
	}
}

export default AreYouSureBox;
