import React, { useState, useEffect } from 'react';

import Item from './Item';
import { CollapsableCaretIcon } from '../Icons';

import { UserStoredData, is_collapsed, update_collapsed } from '../../Preferences';
import { Bookmark, update_bookmark } from '../../Bookmark';
import { BookmarkProps } from '../../util';

import styles from './styles.scss';

// TODO: change the depth == 0 so that search queries won't be messed up 
// ie. find another way to identify folders
const check_if_folder = (bookmark: Bookmark, depth: number) => (
	bookmark.children && bookmark.children.length > 0 || depth == 0 || !bookmark.url
);

interface TreeProps extends BookmarkProps {
	depth: number;
};

interface TreeState {
	collapsed: boolean;
	pinned: boolean;
	has_loaded: boolean;
};

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

	// Load the state and give it the go ahead to render
	useEffect(() => {
		UserStoredData.then(data => {
			setState({ 
				collapsed: is_collapsed(data, bookmarks.id), 
				pinned: false, // is_pinned(data, bookmarks.id), 
				has_loaded: true 
			});
		})
	}, []);

	// if its not loaded
	if(!state.has_loaded)
		return (<></>);

	const is_folder = check_if_folder(bookmarks, depth);
	
	const folder_icon = (<CollapsableCaretIcon open={state.collapsed} size={16} />);
	const link_icon = (<img src={`https://www.google.com/s2/favicons?domain=${bookmarks.url}`} width="16" height="16" />);
	const icon = is_folder ? folder_icon : link_icon;
	
	// on click, collapse if it is a folder
	// otherwise go to the link
	const on_click = is_folder ? 
		() => {
			setState({ ...state, collapsed: !state.collapsed }); 
			update_collapsed(bookmarks.id);
		} : 
		() => { window.location.href = bookmarks.url || ""; };

	// on title change, update the bookmark with the new text
	const on_change = (text: string) => { update_bookmark(bookmarks.id, text) };
	
	return (
		<div className={styles.folder}>
			
			<Item 
				bookmarks={bookmarks} 
				onClick={on_click}
				onChange={on_change}
				pinned={state.pinned}
				icon={icon}
				depth={depth}
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
