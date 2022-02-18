import React, { useRef, useEffect } from 'react';

interface EditTitleProps {
	value: string;
	onChange: (text: string) => void;
}

// taken out for clarity
const handleChange = (onChange: (text: string) => void) => (ev: Event) => {
	onChange((ev?.target as HTMLElement).innerText); // have to cast the ev.target to an HTMLElement bc of typescipt
};

// So you won't be redirected when editing text
const handleClick = (ev: any) => {
	ev?.stopPropagation();
};

const EditTitle = ({ value, onChange }: EditTitleProps) => {

	const sp = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		sp.current?.addEventListener('input', handleChange(onChange));

		return () => {
			sp.current?.removeEventListener('input', handleChange(onChange));
		};
	}, [ sp ]);

	return (
		<span onClick={handleClick} ref={sp} contentEditable={true} suppressContentEditableWarning={true}>{value}</span>
	);

};

export default EditTitle;
