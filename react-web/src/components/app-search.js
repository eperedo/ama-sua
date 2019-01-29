import React from 'react';

function AppSearch(props) {
	return (
		<div className="app-search">
			<form onSubmit={e => {
				props.onSubmit(e, document.querySelector('input#search-input').value);
			}}>
				<input
					id="search-input"
					aria-label="Buscar por nombre, ciudad o bancada"
					className="app-search-input"
					placeholder="Buscar por nombre, ciudad o bancada.."
				/>
			</form>
		</div>
	);
}

export default AppSearch;
