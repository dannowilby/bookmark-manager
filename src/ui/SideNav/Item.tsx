import React from 'react';

import EditTitle from '../util/EditTitle';
import { PinIcon } from '../Icons';
import { Bookmark } from '../../data/Bookmark';

import styles from './styles.scss';

const indent_size = 2;
const indent_unit = 'rem';

interface ItemProps {
	bookmarks: Bookmark,
	onClick: () => void;
	onChange: (text: string) => void;
	pinned: boolean;
	icon: any;
	depth: number;
};

/**
 * The actual item that is rendered
 * Renders both folders and files
 */
const Item = ({ bookmarks, onClick, onChange, pinned, icon, depth }: ItemProps) => (
	
	<div 
		style={{ marginLeft: `${depth * indent_size}${indent_unit}` }} 
		className={styles.file} 
		onClick={onClick}
		data-id={bookmarks.id}
	>
		<span>
			{ icon }
			{ (depth == 0) ? 
				<span>{bookmarks.title}</span> :
				<EditTitle value={bookmarks.title} onChange={onChange} />
			}
		</span>
		<div className={[ styles.icons, pinned ? styles.pinned : '' ].join(' ')}>
			<PinIcon size={16} open={pinned} />
		</div>
	</div>
);

export default Item;

