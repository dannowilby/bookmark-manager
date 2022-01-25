
import React, { useEffect, useState, useContext } from 'react';

import { get_bookmark_tree } from './Bookmark';

import SideNav from './ui/SideNav/index';
import Header from './ui/Header/index';

import styles from './styles.scss';

const refresh_helper = (setState: (n: chrome.bookmarks.BookmarkTreeNode | null) => void) => () => {

	get_bookmark_tree((results) => setState(results[0]));

};

const App = () => {

	const [state, setState] = useState<chrome.bookmarks.BookmarkTreeNode | null>(null);

	let refresh = refresh_helper(setState);
	useEffect(refresh, []);

	return (
		<div className={styles.container}>
			
			<Header />
			
			<SideNav bookmarks={state} styles={styles.nav} refresh={refresh} />
			{ /* <Pinned bookmarks={state} /> */ }

		</div>
	);

}

export default App;
