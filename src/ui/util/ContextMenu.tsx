import React, { useCallback, useEffect, useState } from 'react';

import styles from './styles.scss';

interface ContextMenuState {
	show: boolean;
	event: MouseEvent | null;
};

interface MenuOption {
	text: string;
	onClick: (data: ContextMenuState) => () => void;
};

interface ContextMenuProps {
	items?: Array<MenuOption>;
};

const ContextMenu = ({ items }: ContextMenuProps) => {

	const [state, setState] = useState<ContextMenuState>({
		show: false,
		event: null
	});

	const click_out = useCallback(() => {
		if(state.show)
			setState({ ...state, show: false });
	}, [state, setState]);

	const handle = useCallback((event: MouseEvent) => {
		event.preventDefault();
		setState({ 
			show: true,
			event: event
		});
	}, [setState]);

	useEffect(() => {

		document.addEventListener('contextmenu', handle);
		document.addEventListener('click', click_out);

		return () => { 
			document.removeEventListener('contextmenu', handle); 
			document.removeEventListener('click', click_out);
		}
	});

	if(!state.show)
		return (<></>)
	return (
		<div 
			className={styles.contextmenu}
			style={{ top: state.event?.pageY, left: state.event?.pageX }}
		>
			{ items && items.map((v, k) => (
				<a className={styles.item} key={k} onClick={v.onClick(state)}>{v.text}</a>
			))}
		</div>
	);
}


export { ContextMenuState, MenuOption };
export default ContextMenu;
