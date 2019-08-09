import React from 'react';

const questions = [
	{
		id: 2,
		text: 'De dónde se obtiene la información?',
		answer: 'Toda la información es obtenida del portal del congreso',
	},
	{
		id: 1,
		text: 'La información está actualizada?',
		answer:
			'La información está actualizada al 8 de diciembre del 2018',
	},
	{
		id: 3,
		text: 'Quién paga los gastos de esta aplicación?',
		answer:
			'Yo asumo todos los gastos. Por ahora el único gasto que la aplicación genera es mi tiempo.',
	},
	{
		id: 4,
		text: 'Quién eres tú?',
		answer: 'Eduardo P. Rivero, https://github.com/eperedo',
	},
	{
		id: 6,
		text: 'Cómo funciona la aplicación?',
		answer:
			'Usando técnicas simples de scrapping se automatiza la información básica como nombre, email, cargos, cantidad de votos de los congresistas. La información de las faltas fue generada de manera manual revisando las actas generadas por el pleno subidas como formato pdf en la web del congreso.',
	},
	{
		id: 5,
		text: 'Qué tecnología usaste para crear esta app?',
		answer: 'Algolia, puppeteer y react por ahora.',
	},
];

function AppFaq() {
	return (
		<section className="app-questions">
			<h1>Preguntas Frecuentes</h1>
			{questions.map(question => {
				return (
					<div className="app-questions-item" key={question.id}>
						<p className="title">
							<strong>{question.text}</strong>
						</p>
						<p className="subtitle">{question.answer}</p>
					</div>
				);
			})}
		</section>
	);
}

export default AppFaq;
