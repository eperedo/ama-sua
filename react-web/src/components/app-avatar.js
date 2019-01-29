import React from 'react';

function AppAvatar(props) {
	const view = props.status ? <img
	className="avatar"
	width="150"
	height="136"
	src={props.avatar}
	alt={props.alt}	/> : 'Cargando imagen...';
	return view;
}

export default AppAvatar;
