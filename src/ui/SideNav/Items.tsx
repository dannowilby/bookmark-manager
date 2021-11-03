import React, { useState } from 'react';

import { EditIcon, TrashIcon, CollapsableCaretIcon, PinIcon } from '../Icons';
import { BookmarkProps } from '../../util';

import styles from './styles.scss';


interface ItemProps {
	title: string;
	link?: string;
	onClick: () => void;
	icon: any;
	depth: number;
};

interface TreeProps extends BookmarkProps {
	depth: number;
};

const Item = ({ title, link, onClick, icon, depth }: ItemProps) => (
	<div className={styles.file} onClick={onClick}>
		<span>
			{ icon }
			<a href={link}>{title}</a>
		</span>
		<div className={styles.icons}>
			<EditIcon size={16} />
			<PinIcon size={16} open={false} />
			<TrashIcon size={16} />
		</div>
	</div>
);

const Tree = ({ bookmarks, depth }: TreeProps) => {

	const [collapsed, setCollapsed] = useState(false);

	if(!bookmarks)
		return (<></>);

	// TODO: change the depth == 0 so that search queries won't be messed up, ie. find another way to identify folders
	const is_folder = bookmarks.children && bookmarks.children.length > 0 || depth == 0;
	const icon = is_folder ? 
		(<CollapsableCaretIcon open={collapsed} size={16} />) : 
		(<img src={`https://www.google.com/s2/favicons?domain=${bookmarks.url}`} width="16" height="16" />);
	const on_click = is_folder ? () => { setCollapsed(!collapsed) } : () => { window.location.href = bookmarks.url || ""; };
	
	return (
		<div className={styles.folder}>
			
			<Item 
				title={bookmarks.title} 
				onClick={on_click} 
				icon={icon}
				depth={depth}
			/>

			{ !collapsed && bookmarks.children && bookmarks.children.length > 0  && bookmarks.children.map((child) => (
				<Tree bookmarks={child} depth={depth + 1} />
			)) }
		</div>
	);
}

// TODO: add a way to save state between new instances of the page

export default Tree;

