import React, { Component } from 'react';
import PoliticiansList from './politicians/politicians-list';
import './App.css';

class App extends Component {
	static POLITICIAN_URL = `${process.env.REACT_APP_ALGOLIA_BASE_URL}/${
		process.env.REACT_APP_ALGOLIA_POLITICIANS_URL
	}`;

	state = {
		politicians: [],
	};

	async componentDidMount() {
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
		this.setState({
			politicians: json.hits,
		});
	}
	render() {
		return (
			<div className="App">
				<PoliticiansList politicians={this.state.politicians} />
			</div>
		);
	}
}

export default App;
