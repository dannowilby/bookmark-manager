import React, { useState, useEffect } from 'react';

import { UserStoredData, is_collapsed, update_collapsed } from '../../Preferences';

import { EditIcon, TrashIcon, CollapsableCaretIcon, PinIcon } from '../Icons';
import { BookmarkProps } from '../../util';

import styles from './styles.scss';

// TODO: change the depth == 0 so that search queries won't be messed up 
// ie. find another way to identify folders
// TODO: add a way to save state between new instances of the page
// More specifically save which folders are collapsed and which nodes are pinned,
// also the indent size and indent unit, maybe the color theme as well if the css isn't that hard

const indent_size = 2;
const indent_unit = 'rem';

interface ItemProps {
	title: string;
	onClick: () => void;
	pinned: boolean;
	icon: any;
	depth: number;
	id: string;
};

interface TreeProps extends BookmarkProps {
	depth: number;
};

interface TreeState {

	collapsed: boolean;
	pinned: boolean;
	has_loaded: boolean;

};

/**
 * The actual item that is rendered
 * Renders both folders and files
 */
const Item = ({ title, onClick, pinned, icon, depth, id }: ItemProps) => (
	
	<div 
		style={{ marginLeft: `${depth * indent_size}${indent_unit}` }} 
		className={styles.file} 
		onClick={onClick}
		data-id={id}
	>
		<span>
			{ icon }
			<span>{title}</span>
		</span>
		<div className={styles.icons}>
			<EditIcon size={16} />
			<PinIcon size={16} open={pinned} />
			<TrashIcon size={16} />
		</div>
	</div>
);

/**
 * A recursive component to render all the bookmark node passed in and all its children
 */
const Tree = ({ bookmarks, depth }: TreeProps) => {

	if(!bookmarks)
		return (<></>);

	const [state, setState] = useState<TreeState>({ 
		collapsed: false,
		pinned: false,
		has_loaded: false 
	});

	useEffect(() => {
		UserStoredData.then(data => {
			setState({ 
				collapsed: is_collapsed(data, bookmarks.id), 
				pinned: false, // is_pinned(data, bookmarks.id), 
				has_loaded: true 
			});
		})
	}, []);

	if(!state.has_loaded)
		return (<></>);

	const is_folder = bookmarks.children && bookmarks.children.length > 0 || depth == 0;
	
	const icon = is_folder ? 
		<CollapsableCaretIcon open={state.collapsed} size={16} /> : 
		<img 
		 	src={`https://www.google.com/s2/favicons?domain=${bookmarks.url}`} 
			width="16" 
			height="16" 
		/>;
	
	const on_click = is_folder ? 
		() => { 
			setState({ ...state, collapsed: !state.collapsed }); 
			update_collapsed(bookmarks.id);
		} : 
		() => { window.location.href = bookmarks.url || ""; };
	
	return (
		<div className={styles.folder}>
			
			<Item 
				title={bookmarks.title} 
				onClick={on_click}
				pinned={state.pinned}
				icon={icon}
				depth={depth}
				id={bookmarks.id}
			/>

			{ !state.collapsed && bookmarks.children && bookmarks.children.length > 0 && 
				bookmarks.children.map((child) => (
					<Tree key={child.id} bookmarks={child} depth={depth + 1} />
				)) 
			}
		</div>
	);
}

export default Tree;

