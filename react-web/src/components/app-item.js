import React from 'react';

function AppItem(props) {
	const showLine = props.showLine || true;
	return (
		<section>
			<section className="app-item">
				<div className="app-item-text">
					<p>{props.text}</p>
					<span>{props.subtext}</span>
				</div>
				<div className="app-item-number">
					<span>{props.number}</span>
				</div>
			</section>
			{showLine ? <hr /> : ''}
		</section>
	);
}

export default AppItem;
