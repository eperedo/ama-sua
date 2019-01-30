import React from 'react';
import AppAvatar from '../components/app-avatar';

function PoliticiansProfileHeader(props) {
	const url = props.cloudinary ? props.cloudinary.url : '';
	return (
		<header className="politicians-profile-header">
			<div className="back-arrow">
				<span
					onClick={props.onClickProfile}
					role="button"
					aria-label="Regresar"
				>
					◀
				</span>
			</div>
			<AppAvatar noLazy={true} alt={`ama sua ${props.fullName}`} avatar={url} />
			<h1>{props.fullName}</h1>
			<h2>{props.party}</h2>
		</header>
	);
}

export default PoliticiansProfileHeader;
