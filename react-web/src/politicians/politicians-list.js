import React from 'react';
import PoliticiansItem from './politicians-item';

function PoliticiansList(props) {
	return (
		<div className="politician-list">
			{props.politicians.map(politician => {
				return <PoliticiansItem {...politician} key={politician.webId} />;
			})}
		</div>
	);
}

export default PoliticiansList;
