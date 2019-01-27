import React, { Component } from 'react';
import PoliticiansList from './politicians/politicians-list';
import PoliticiansProfile from './politicians/politicians-profile';
import AppNavBar from './components/app-nav-bar';
import './App.css';

class App extends Component {
	static POLITICIAN_URL = `${process.env.REACT_APP_ALGOLIA_BASE_URL}/${
		process.env.REACT_APP_ALGOLIA_POLITICIANS_URL
	}`;
	static POLITICIANS = [];

	state = {
		currentRouteId: window.location.pathname === '/' ? 'home' : 'profile',
		currentPolitician: null,
		politicians: [],
		routes: [
			{
				id: 'home',
				componentName: 'Politicians-List',
			},
			{
				id: 'profile',
				componentName: 'Politicians-Profile',
			},
		],
	};

	async componentDidMount() {
		window.onpopstate = () => {
			this.setState({
				currentRouteId: window.location.pathname === '/' ? 'home' : 'profile',
			});
		};
		const url = new URL(App.POLITICIAN_URL);
		const params = [['hitsPerPage', 130]];
		url.search = new URLSearchParams(params);
		const response = await fetch(url, {
			headers: {
				'X-Algolia-API-Key': process.env.REACT_APP_ALGOLIA_API_KEY,
				'X-Algolia-Application-Id': process.env.REACT_APP_ALGOLIA_APP_ID,
			},
		});
		const json = await response.json();
		App.POLITICIANS = json;
		let webId;
		if (this.state.currentRouteId === 'profile') {
			webId = window.location.pathname.split('/politicians/')[1];
		}
		this.setState({
			politicians: json.hits,
			currentPolitician: webId ? json.hits.find(p => p.webId === webId) : null,
		});
	}

	onClick = (e, pol) => {
		e.preventDefault();
		window.history.pushState(
			{ id: pol.webId },
			`Congresista - ${pol.fullName}`,
			`/politicians/${pol.webId}`,
		);
		this.setState({
			currentRouteId: 'profile',
			currentPolitician: pol,
		});
	};
	render() {
		return (
			<div className="App">
				{this.state.currentRouteId === 'home' ? (
					<PoliticiansList
						politicians={this.state.politicians}
						onClick={this.onClick}
					/>
				) : (
					<PoliticiansProfile {...this.state.currentPolitician} />
				)}
				<AppNavBar />
			</div>
		);
	}
}

export default App;
