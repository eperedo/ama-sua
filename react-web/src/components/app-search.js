import React from 'react';

function AppSearch(props) {
	let searchTerm = '';
	return (
		<div className="app-search">
			<form onSubmit={e => props.onSubmit(e, searchTerm)}>
				<input
					autoFocus
					className="app-search-input"
					placeholder="Buscar por nombre, ciudad o bancada.."
					onChange={e => {
						searchTerm = e.target.value;
					}}
				/>
			</form>
		</div>
	);
}

export default AppSearch;
