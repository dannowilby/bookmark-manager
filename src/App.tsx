
import React, { useEffect, useState, useContext } from 'react';

import SideNav from './ui/SideNav/index';
import Header from './ui/Header/index';

import styles from './styles.scss';


const App = () => {

	const [state, setState] = useState<chrome.bookmarks.BookmarkTreeNode | null>(null);

	useEffect(() => chrome.bookmarks.getTree((results) => 
		setState(results[0])
	), []);

	return (
		<div className={styles.container}>
			
			<Header />
			
			<SideNav bookmarks={state} styles={styles.nav} />
			{ /* <Pinned bookmarks={state} /> */ }

		</div>
	);

}

export default App;
