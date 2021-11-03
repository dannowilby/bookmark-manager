
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Header from './ui/Header';

const Container = () => ( 
	<div>
		<div>
			<div>Hi there,</div>
			<div>hope you're feeling okay :)</div>
		</div>
	
		<App />
	</div>
);

ReactDOM.render(
	React.createElement(App),
	document.getElementById('root')
);

