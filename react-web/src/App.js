import React, { Component, Fragment } from 'react';
import PoliticiansList from './politicians/politicians-list';
import PoliticiansProfile from './politicians/politicians-profile';
import AppNavBar from './components/app-nav-bar';
import AppSearch from './components/app-search';
import AppFaq from './components/app-faq';
import './App.css';

class App extends Component {
	static APP_NAME = 'Ama Sua';
	static POLITICIAN_URL = `${process.env.REACT_APP_ALGOLIA_BASE_URL}/${
		process.env.REACT_APP_ALGOLIA_POLITICIANS_URL
	}`;

	static getRoute() {
		const { pathname } = window.location;
		if (pathname === '/') {
			return 'home';
		} else if (pathname === '/faq') {
			return 'faq';
		} else {
			return 'profile';
		}
	}

	state = {
		currentRouteId: App.getRoute(),
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
			window.document.title = `${App.APP_NAME} - ${politician.fullName}`;
		}
		this.setState({
			politicians: json.hits,
			currentPolitician: webId ? politician : null,
		});
	}

	onClick = (e, pol) => {
		if (pol) {
			e.preventDefault();
			const title = `${App.APP_NAME} - ${pol.fullName}`;
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

	onClickNavBar = (e, { id }) => {
		e.preventDefault();
		if (id === 'home') {
			this.onClickProfile();
		} else {
			const title = `${App.APP_NAME} - Preguntas Frecuentes`;
			this.setState({
				currentRouteId: 'faq',
			});
			window.history.pushState(null, title, '/faq');
			window.document.title = title;
		}
	};

	onClickProfile = () => {
		const title = App.APP_NAME;
		this.setState({
			currentRouteId: 'home',
		});
		window.history.pushState(null, title, '/');
		window.document.title = title;
	};

	onSubmit = async (e, search) => {
		e.preventDefault();
		const json = await this.fetchPoliticians(search);
		this.setState({
			politicians: json.hits,
		});
	};

	generateView() {
		if (this.state.currentRouteId === 'home') {
			return (
				<Fragment>
					<AppSearch onSubmit={this.onSubmit} />
					<PoliticiansList
						politicians={this.state.politicians}
						onClick={this.onClick}
					/>
				</Fragment>
			);
		} else if (this.state.currentRouteId === 'faq') {
			return <AppFaq />;
		} else {
			return (
				<PoliticiansProfile
					onClickProfile={this.onClickProfile}
					{...this.state.currentPolitician}
				/>
			);
		}
	}
	render() {
		let view = this.generateView();
		return (
			<div className="App">
				{view} <AppNavBar onClickNavBar={this.onClickNavBar} />
			</div>
		);
	}
}

export default App;
