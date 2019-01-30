import React from 'react';

function AppAvatar(props) {
	const view = props.noLazy ? <img
	className="avatar"
	width="150"
	height="136"
	src={props.avatar}
	alt={props.alt}	/>  : <img
	id={`avatar-${props.webId}`}
	className="avatar"
	width="150"
	height="136"
	data-url={props.avatar}
	alt={props.alt}	/>;
	return view;
}

export default AppAvatar;
