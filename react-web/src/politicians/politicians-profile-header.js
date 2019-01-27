import React from 'react';
import AppAvatar from '../components/app-avatar';

function PoliticiansProfileHeader(props) {
	return (
		<header className="politicians-profile-header">
			<AppAvatar alt={`ama sua ${props.fullName}`} avatar={props.avatar} />
			<h1>{props.fullName}</h1>
			<h4>{props.party}</h4>
		</header>
	);
}

export default PoliticiansProfileHeader;
