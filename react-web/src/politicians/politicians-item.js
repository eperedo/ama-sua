import React from 'react';

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
			<img
				className="avatar"
				src={props.avatar}
				alt={`ama sua ${props.fullName}`}
			/>
			<p className="politician-item-sub-title">{props.party}</p>
		</div>
	);
}

export default PoliticianItem;
