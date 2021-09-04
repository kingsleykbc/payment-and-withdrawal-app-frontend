import React, { Component, createContext } from 'react';
import { getUser, updateUser } from '../utils/apiCalls/user';
import cookie from 'js-cookie';
import { loginUser, logout } from '../utils/apiCalls/auth';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
	state = {
		isAuthenticated: null,
		userData: {}
	};

	componentDidMount() {
		this.getUserData();
	}

	login = async (data, navAfterLogin) => {
		await loginUser(data, '/', navAfterLogin);
		this.getUserData();
	};

	logout = async rdir => {
		await logout(rdir);
		this.setState({ isAuthenticated: false, userData: {} });
	};

	// Get/Refresh user data
	getUserData = async () => {
		try {
			const token = cookie.get('token');

			// If user not logged in (no token)
			if (!token) {
				this.setState({ isAuthenticated: false });
				return;
			}
			const userData = await getUser();
			this.setState({ isAuthenticated: true, userData });
		} catch (e) {
			this.logout(false);
		}
	};

	updateUser = async data => {
		const { isAuthenticated } = this.state;
		if (!isAuthenticated) return;
		const userData = await updateUser(data);
		this.setState({ userData });
		return userData;
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	render() {
		return (
			<AuthContext.Provider
				value={{
					...this.state,
					getUserData: this.getUserData,
					refreshUserData: this.getUserData,
					login: this.login,
					logout: this.logout,
					updateUser: this.updateUser
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export default AuthContextProvider;
