
import React from 'react';

import { BookmarkProps } from '../util';

import Folder from './Items';

import styles from './styles.scss';

const SideBar = ({ bookmarks, margin }: BookmarkProps) => (
	<div className={styles.container}>
		{ bookmarks && bookmarks.children && bookmarks.children.map((child) => (<Folder bookmarks={child} margin={margin} />))}
	</div>
);

export default SideBar;
