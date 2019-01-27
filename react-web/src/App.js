import React, { Component } from 'react';
import PoliticiansList from './politicians/politicians-list';
import PoliticiansProfile from './politicians/politicians-profile';
import AppNavBar from './components/app-nav-bar';
import AppSearch from './components/app-search';
import './App.css';

class App extends Component {
	static POLITICIAN_URL = `${process.env.REACT_APP_ALGOLIA_BASE_URL}/${
		process.env.REACT_APP_ALGOLIA_POLITICIANS_URL
	}`;

	state = {
		currentRouteId: window.location.pathname === '/' ? 'home' : 'profile',
		currentPolitician: null,
		politicians: [],
	};

	async fetchPoliticians(query) {
		const url = new URL(App.POLITICIAN_URL);
		const params = [['hitsPerPage', 130]];
		if (query) {
			params.push(['query', query]);
		}
		url.search = new URLSearchParams(params);
		const response = await fetch(url, {
			headers: {
				'X-Algolia-API-Key': process.env.REACT_APP_ALGOLIA_API_KEY,
				'X-Algolia-Application-Id': process.env.REACT_APP_ALGOLIA_APP_ID,
			},
		});
		return response.json();
	}

	async componentDidMount() {
		window.onpopstate = () => {
			this.setState({
				currentRouteId: window.location.pathname === '/' ? 'home' : 'profile',
			});
		};
		const json = await this.fetchPoliticians();
		let webId;
		let politician;
		if (this.state.currentRouteId === 'profile') {
			webId = window.location.pathname.split('/politicians/')[1];
			politician = json.hits.find(p => p.webId === webId);
			window.document.title = `Ama Sua - ${politician.fullName}`;
		}
		this.setState({
			politicians: json.hits,
			currentPolitician: webId ? politician : null,
		});
	}

	onClick = (e, pol) => {
		if (pol) {
			e.preventDefault();
			const title = `Ama Sua - ${pol.fullName}`;
			window.history.pushState(
				{ id: pol.webId },
				title,
				`/politicians/${pol.webId}`,
			);
			this.setState({
				currentRouteId: 'profile',
				currentPolitician: pol,
			});
			window.document.title = title;
		}
	};

	onClickProfile = () => {
		this.setState({
			currentRouteId: 'home',
		});
		window.document.title = 'Ama Sua';
	};

	onSubmit = async (e, search) => {
		e.preventDefault();
		const json = await this.fetchPoliticians(search);
		this.setState({
			politicians: json.hits,
		});
	};
	render() {
		return (
			<div className="App">
				{this.state.currentRouteId === 'home' ? (
					<AppSearch onSubmit={this.onSubmit} />
				) : (
					''
				)}
				{this.state.currentRouteId === 'home' ? (
					<PoliticiansList
						politicians={this.state.politicians}
						onClick={this.onClick}
					/>
				) : (
					<PoliticiansProfile
						onClickProfile={this.onClickProfile}
						{...this.state.currentPolitician}
					/>
				)}
				<AppNavBar />
			</div>
		);
	}
}

export default App;
