import React from 'react';

function PoliticianItem(props) {
	return (
		<div className="politician-item">
			<h2 className="politician-item-title">{props.fullName}</h2>
			<img
				className="avatar"
				src={props.avatar}
				alt={`ama sua ${props.name}`}
			/>
			<p className="politician-item-sub-title">{props.party}</p>
		</div>
	);
}

export default PoliticianItem;
