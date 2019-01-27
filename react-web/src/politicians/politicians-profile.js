import React from 'react';
import PoliticiansProfileHeader from './politicians-profile-header';
import AppListItem from '../components/app-list-item';

function getAdditionalInformation({ additional }) {
	let result = {
		place: '',
		votes: '',
		group: '',
	};
	if (additional) {
		result.place = additional.place;
		result.votes = additional.votes;
		result.group = additional.party;
		return result;
	}
	return result;
}

function PoliticianProfile(props) {
	const { place, votes, group } = getAdditionalInformation(props);
	const items = [
		{
			id: 1,
			text: 'Votos',
			number: votes,
		},
		{
			id: 2,
			text: 'Ciudad',
			number: place,
		},
		{
			id: 3,
			text: 'Partido',
			number: group,
		},
	];
	return (
		<section className="politicians-profile">
			<PoliticiansProfileHeader
				onClickProfile={props.onClickProfile}
				{...props}
			/>
			<AppListItem items={items} />
		</section>
	);
}

export default PoliticianProfile;
