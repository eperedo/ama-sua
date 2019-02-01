import React, { Component, Fragment, Suspense } from 'react';
import AppNavBar from './components/app-nav-bar';
import AppSearch from './components/app-search';
import AppFaq from './components/app-faq';
import PoliticiansList from './politicians/politicians-list';

const PoliticiansProfile = React.lazy(() =>
	import('./politicians/politicians-profile'),
);

class App extends Component {
	static APP_NAME = 'Ama Sua';
	static PAGE = 0;
	static TOTAL_PAGES = 0;
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
		search: '',
		currentRouteId: App.getRoute(),
		currentPolitician: null,
		politicians: [],
		statusPoliticians: false,
	};

	async fetchPoliticians(objectId) {
		const url = new URL(
			objectId ? `${App.POLITICIAN_URL}/${objectId}` : App.POLITICIAN_URL,
		);
		const params = [['hitsPerPage', 10]];
		if (this.state.search) {
			params.push(['query', this.state.search]);
		}
		params.push(['page', App.PAGE]);
		url.search = new URLSearchParams(params);
		const response = await fetch(url, {
			headers: {
				'X-Algolia-API-Key': process.env.REACT_APP_ALGOLIA_API_KEY,
				'X-Algolia-Application-Id': process.env.REACT_APP_ALGOLIA_APP_ID,
			},
		});
		const json = await response.json();
		if (!objectId) {
			App.TOTAL_PAGES = json.nbPages;
		}
		return json;
	}

	lazyLoadImage(politicians) {
		politicians.forEach(politician => {
			const currentAvatar = document.querySelector(
				`img#avatar-${politician.webId}`,
			);
			const options = {
				root: null,
				threshold: 0,
			};
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						currentAvatar.src = currentAvatar.dataset.url;
						observer.unobserve(currentAvatar);
					}
				});
			}, options);
			observer.observe(currentAvatar);
		});
	}

	observePagination() {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry && entry.isIntersecting) {
					App.PAGE += 1;
					if (App.PAGE < App.TOTAL_PAGES) {
						const response = await this.fetchPoliticians();
						const newPoliticians = this.state.politicians.concat(response.hits);
						this.setState(
							{
								politicians: newPoliticians,
							},
							() => {
								this.lazyLoadImage(this.state.politicians);
							},
						);
					}
				}
			},
			{ threshold: 0 },
		);
		const target = document.querySelector('#infinite-scroll');
		observer.observe(target);
	}

	async componentDidMount() {
		window.onpopstate = () => {
			this.setState({
				currentRouteId: window.location.pathname === '/' ? 'home' : 'profile',
			});
		};
		const isProfile = this.state.currentRouteId === 'profile';
		const json = await this.fetchPoliticians();
		let webId;
		let politician;
		if (isProfile) {
			webId = window.location.pathname.split('/politicians/')[1];
			politician = await this.fetchPoliticians(webId);
			window.document.title = `${App.APP_NAME} - ${politician.fullName}`;
		}
		this.setState(
			{
				politicians: json.hits,
				currentPolitician: webId ? politician : null,
			},
			() => {
				if (!isProfile) {
					this.lazyLoadImage(this.state.politicians);
				}
			},
		);
		if (!isProfile) {
			this.observePagination();
		}
		setTimeout(() => {
			this.setState({
				statusPoliticians: true,
			});
		}, 2000);
	}

	onClick = (e, pol) => {
		if (pol) {
			e.preventDefault();
			const title = `${App.APP_NAME} - ${pol.fullName}`;
			window.history.pushState(
				{ id: pol.webId },
				title,
				`/politicians/${pol.objectID}`,
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
		this.setState(
			{
				currentRouteId: 'home',
			},
			() => {
				window.history.pushState(null, title, '/');
				window.document.title = title;
				this.lazyLoadImage(this.state.politicians);
				this.observePagination();
			},
		);
	};

	onSubmit = (e, search) => {
		e.preventDefault();
		this.setState(
			{
				search,
			},
			async () => {
				App.PAGE = 0;
				const json = await this.fetchPoliticians();
				this.setState(
					{
						politicians: json.hits,
					},
					() => {
						this.lazyLoadImage(this.state.politicians);
					},
				);
			},
		);
	};

	generateView() {
		if (this.state.currentRouteId === 'home') {
			return (
				<Fragment>
					<AppSearch onSubmit={this.onSubmit} />
					<PoliticiansList
						status={this.state.statusPoliticians}
						politicians={this.state.politicians}
						onClick={this.onClick}
					/>
				</Fragment>
			);
		} else if (this.state.currentRouteId === 'faq') {
			return <AppFaq />;
		} else {
			return (
				<Suspense fallback={<div>Cargando...</div>}>
					<PoliticiansProfile
						onClickProfile={this.onClickProfile}
						{...this.state.currentPolitician}
					/>
				</Suspense>
			);
		}
	}
	render() {
		const view = this.generateView();
		return (
			<div className="App">
				{view} <AppNavBar onClickNavBar={this.onClickNavBar} />
			</div>
		);
	}
}

export default App;
