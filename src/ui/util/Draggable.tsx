import React, { ReactNode } from 'react';


interface DropTargetProps {
	onDrop: (data: string) => void;
	children: ReactNode;
}

const DropTarget = ({ onDrop, children }: DropTargetProps) => {

	const dragover_handler = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		ev.dataTransfer.effectAllowed = "move";
		return false;
	};

	const drop_handler = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		onDrop(ev.dataTransfer.getData("text/plain"));

		return false;
	};

	return (
		<div
			onDrop={e => drop_handler(e)}
			onDragOver={e => dragover_handler(e)}
			onDragEnter={e => dragover_handler(e)}
			onDragLeave={e => dragover_handler(e)}
		>
			{ children }
		</div>
	);

};

interface DragSourceProps {
	draggable: boolean;
	data: string;
	children: ReactNode;
}

const DragSource = ({ draggable, data, children }: DragSourceProps) => {
	
	const dragstart_handler = (ev: React.DragEvent<HTMLDivElement>) => {
		ev.dataTransfer.setData("text/plain", data);
		ev.dataTransfer.effectAllowed = "move";
	};

	return (
		<div 
			draggable={draggable}
			onDragStart={dragstart_handler}
		>
			{ children }
		</div>
	);
};

export { DragSource, DropTarget };
