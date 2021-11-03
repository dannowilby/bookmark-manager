
import React from 'react';

import { BookmarkProps } from '../../util';

import Tree from './Items';

interface SideNavProps extends BookmarkProps {
	styles: string;
};

const SideNav = ({ bookmarks, styles }: SideNavProps) => (
	<div className={styles}>
		{ bookmarks && bookmarks.children && bookmarks.children.map((child) => (<Tree bookmarks={child} depth={0} />))}
	</div>
);

export default SideNav;
