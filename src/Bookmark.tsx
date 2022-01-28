
export type Bookmark = chrome.bookmarks.BookmarkTreeNode;

export const get_bookmark_tree = (callback: (results: Bookmark[]) => void) => 
	chrome.bookmarks.getTree(callback); 

export const create_sub_folder = (pid: string) => {
	chrome.bookmarks.create({
		parentId: pid,
		title: "New folder",
		url: undefined,
		index: 0
	});
}

export const remove_bookmark = (id: string) => {
	chrome.bookmarks.removeTree(id, () => {});
};

export const update_bookmark = (id: string, title: string) => {
	chrome.bookmarks.update(id, { title }, () => {});
};
