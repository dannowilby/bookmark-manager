
export const get_bookmark_tree = (callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void) => 
	chrome.bookmarks.getTree(callback); 

export const create_sub_folder = (pid: string) => {
	chrome.bookmarks.create({
		parentId: pid,
		title: "New folder",
		url: undefined,
		index: 0
	});
}

export const update_bookmark = (id: string, title: string) => {
	chrome.bookmarks.update(id, { title }, () => {});
};
