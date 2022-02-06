
import React, { useEffect } from 'react';

import { Bookmark, create_sub_folder, remove_bookmark } from '../../data/Bookmark';

import Tree from './Tree';
import ContextMenu, { ContextMenuState } from '../util/ContextMenu';

interface SideNavProps {
	bookmarks: Bookmark;
	className: string;
	refresh: () => void;
};

// get the bookmark id from the passed data
const get_id = (cms: ContextMenuState) => {
	
	if(!cms.event)
		return -1;

	let target = cms.event.target as HTMLElement;

	if(target.nodeName == "SPAN" && target.parentElement)
		target = target.parentElement;
	if(target.nodeName == "SPAN" && target.parentElement)
		target = target.parentElement;
	
	if(target.nodeName != "DIV")
		return -1;

	const id = target.dataset.id;

	if(id) return id;

	return -1;

}

const SideNav = ({ bookmarks, className, refresh }: SideNavProps) => (
	<div className={className}>
		{ bookmarks && bookmarks.children && bookmarks.children.map((child) => (<Tree key={child.id} refresh={refresh} bookmarks={child} depth={0} />))}
		<ContextMenu items={[ 
			{ text: 'Add new subfolder', onClick: (e) => () => {
				const id = get_id(e);
				if(id == -1)
					return;
				create_sub_folder(id);
				refresh();
			}},
			{ text: 'Remove bookmark', onClick: (e) => () => {
				const id = get_id(e);
				if(id == -1)
					return;
				remove_bookmark(id);
				refresh();
			}}
		]} />
	</div>
)

export default SideNav;
