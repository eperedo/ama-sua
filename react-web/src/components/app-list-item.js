import React from 'react';
import AppItem from './app-item';

function AppListItem(props) {
	return (
		<div>
			{props.items.map(item => {
				return <AppItem {...item} key={item.id} />;
			})}
		</div>
	);
}

export default AppListItem;
