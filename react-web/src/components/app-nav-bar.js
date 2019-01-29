import React from 'react';
import './../stylesheets/navbar.css';

function AppNavBar(props) {
	const items = [
		{
			id: 'home',
			href: '/',
			icon: 'home',
			text: 'Home',
		},
		{
			id: 'faq',
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
							<a onClick={e => props.onClickNavBar(e, item)} href={item.href}>
								{item.text}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default AppNavBar;
