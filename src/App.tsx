
import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

import { Bookmark, get_bookmark_tree } from './data/Bookmark';

import SideNav from './ui/SideNav/index';
import Pinned from './ui/Pinned/index';
import Header from './ui/Header/index';

import styles from './styles.scss';

const refresh_helper = (setState: (n: Bookmark) => void) => () => {

	get_bookmark_tree((results) => setState(results[0]));

};

const default_bookmark: Bookmark = {
	id: "0",
	title: "Loading...",
};

interface AppState {
  bookmarks: Bookmark,
};

const App = () => {

	const [state, setState] = useState<Bookmark>(default_bookmark);

	let refresh = refresh_helper(setState);
	useEffect(refresh, []);

	return (
		<div className={styles.container}>
			
			<Header />
			
			<SideNav bookmarks={state} className={styles.nav} refresh={refresh} />
			<Pinned className={styles.pin} />

		</div>
	);

}

ReactDOM.render(
	React.createElement(App),
	document.getElementById('root')
);
