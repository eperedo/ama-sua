import React from 'react';

function AppNavBar() {
	const items = [
		{
			id: 1,
			href: '/',
			icon: 'home',
			text: 'Home',
		},
		{
			id: 2,
			href: '/faq',
			icon: 'faq',
			text: 'FAQ',
		},
	];
	return (
		<nav className="app-navbar">
			<ul className="app-navbar-list">
				{items.map(item => {
					return (
						<li key={item.id} className="app-navbar-list-item">
							<a href={item.href}>{item.text}</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default AppNavBar;
