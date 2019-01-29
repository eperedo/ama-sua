import React from 'react';
import PoliticiansProfileHeader from './politicians-profile-header';
import AppListItem from '../components/app-list-item';
import './../stylesheets/politicians-profile.css';

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
			text: 'Presente',
			number: props.totalPr,
		},
		{
			text: 'Ausencias',
			number: props.totalAu,
		},
		{
			text: 'Ausencias con Licencia Oficial',
			number: props.totalLo,
		},
		{
			text: 'Ausencias con Licencia Enfermedad',
			number: props.totalLe,
		},
		{
			text: 'Votos',
			number: votes,
		},
		{
			text: 'Ciudad',
			number: place,
		},
		{
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
