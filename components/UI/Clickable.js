import React from 'react';

const Clickable = ({ onClick, children, margin = '0', animateOpacity = true }) => {
	return (
		<div onClick={onClick}>
			{children}

			{/* STYLE */}
			<style jsx>{`
				div {
					display: inline-block;
					cursor: pointer;
					margin: ${margin};
					transition: opacity linear 0.15s;
				}

				div:hover {
					opacity: ${animateOpacity ? 0.5 : 0};
				}
			`}</style>
		</div>
	);
};

export default Clickable;
