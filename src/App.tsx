
import React, { useEffect, useState } from 'react';

import { init_preferences } from './util';

import SideNav from './ui/SideNav/index';
import Header from './ui/Header/index';

import styles from './styles.scss';


const loaded_preferences = init_preferences();
const Preferences = React.createContext(loaded_preferences);

const App = () => {

	const [state, setState] = 
		useState<chrome.bookmarks.BookmarkTreeNode | null>(null);

	useEffect(() => chrome.bookmarks.getTree(
		(results) => setState(results[0])), 
		[]
	);

	console.log(state);

	return (
		<div className={styles.container}>
			
			<Header />
			
			<Preferences.Provider value={loaded_preferences}>
				
				<SideNav bookmarks={state} styles={styles.nav} />
				{ /* <Pinned bookmarks={state} /> */ }

			</Preferences.Provider>
		</div>
	);

}

export { Preferences };
export default App;
