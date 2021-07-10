
import React, { useState } from 'react';

import { EditIcon, TrashIcon, CollapsableCaretIcon, PinIcon } from '../Icons';
import { BookmarkProps } from '../util';

import styles from './styles.scss';


interface ItemProps {
	title: string;
	link?: string;
	onClick: () => void;
	margin: number;
	icon: any;
};

const Item = ({ title, link, onClick, margin, icon }: ItemProps) => (
	<div draggable={true} className={styles.file} onClick={onClick} style={{ marginLeft: `${margin}px`, width: `calc(calc(100% - ${margin}) - 0.5rem)`}}>
		{ icon }
		<a href={link}>{title}</a>
		<div className={styles.edit_icon}>
			<EditIcon size={16} />
			<PinIcon size={16} open={false} />
			<TrashIcon size={16} />
		</div>
	</div>
);

const File = ({ bookmarks, margin }: BookmarkProps) => {
	
	if(!bookmarks) return (<></>)
	
	return (
		<Item title={bookmarks.title} onClick={() => {}} link={bookmarks.url} margin={margin} icon={			
			<img src={`https://www.google.com/s2/favicons?domain=${bookmarks.url}`} width="16" height="16" />
		} />

	);
};

const Folder = ({ bookmarks, margin }: BookmarkProps) => {

	const [collapsed, setCollapsed] = useState(false);

	if(!bookmarks)
		return (<></>);

	return (
		<div draggable={true} className={styles.folder}>
			
			<Item 
				title={bookmarks.title} 
				onClick={() => { setCollapsed(!collapsed) }} 
				margin={margin} 
				icon={
					<CollapsableCaretIcon open={collapsed} size={16} />
				}
			/>

			{ !collapsed && bookmarks.children && bookmarks.children.length > 0 && bookmarks.children.map((child) => (
				child.url ? 
					<File bookmarks={child} margin={margin + 10} /> :
					<Folder bookmarks={child} margin={margin + 10} />
			)) }
		</div>
	);

};

export default Folder;

