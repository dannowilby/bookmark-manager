import React, { useCallback, useEffect, useState } from 'react';

import styles from './styles.scss';

interface ContextMenuState {
	x: number;
	y: number;
	show: boolean;
};

const ContextMenu = () => {

	const [state, setState] = useState<ContextMenuState>({
		x: 0,
		y: 0,
		show: false
	});

	const click_out = useCallback(() => {
		if(state.show)
			setState({ ...state, show: false });
	}, [state, setState]);

	const handle = useCallback((event: MouseEvent) => {
		setState({ x: event.pageX, y: event.pageY, show: true });
		event.preventDefault();
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
			style={{ top: state.y, left: state.x }}
		>
		</div>
	);
}


export default ContextMenu;
