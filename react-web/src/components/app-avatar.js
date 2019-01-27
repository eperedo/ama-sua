import React from 'react';

function AppAvatar(props) {
	return (
		<img
			className="avatar"
			width="150"
			height="136"
			src={props.avatar}
			alt={props.alt}
		/>
	);
}

export default AppAvatar;
