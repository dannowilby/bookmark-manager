
import React, { useEffect } from 'react';

import { BookmarkProps } from '../../util';

import Tree from './Items';
import ContextMenu from './ContextMenu';

interface SideNavProps extends BookmarkProps {
	styles: string;
};

const rightClick = (event: any) => {

	if(event && event.target)
		console.log(event.target);

};

const SideNav = ({ bookmarks, styles }: SideNavProps) => (
	<div className={styles}>
		{ bookmarks && bookmarks.children && bookmarks.children.map((child) => (<Tree key={child.id} bookmarks={child} depth={0} />))}
		<ContextMenu />
	</div>
)

export default SideNav;
