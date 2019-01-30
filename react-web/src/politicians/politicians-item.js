import React from 'react';
import AppAvatar from '../components/app-avatar';

function PoliticianItem(props) {
	return (
		<div className="politician-item">
			<h2 className="politician-item-title">
				<a
					href={`/politicians/${props.webId}`}
					onClick={e => props.onClick(e, props)}
				>
					{props.fullName}
				</a>
			</h2>
			<AppAvatar
				webId={props.webId}
				avatar={props.cloudinary.url}
				alt={`ama sua ${props.fullName}`}
			/>
			<p className="politician-item-sub-title">{props.party}</p>
		</div>
	);
}

export default PoliticianItem;
