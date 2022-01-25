
export interface BookmarkProps {
	bookmarks: chrome.bookmarks.BookmarkTreeNode | null;
};


/* HELPER FUNCTIONS */

const set_to_object = (set: Set<string>): object => {

	let t = {};

	set.forEach(v => {
		t = { ...t, [v]: true };
	});

	return t;
};

const object_to_set = (o: object): Set<string> => {
	
	let t = new Set<string>();

	Object.entries(o).forEach(([k, v]) => {
		t.add(k);
	})

	return t;
};

export { set_to_object, object_to_set };
