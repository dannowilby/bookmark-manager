
import React, { useEffect, useState } from 'react';

import SearchBar from './SearchBar/index';
import SideBar from './SideBar/index';

import styles from './styles.scss';

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
			<SearchBar />
			<SideBar bookmarks={state} margin={0} />
			{ /* <Pinned bookmarks={state} /> */ }
		</div>
	);

}

export default App;
