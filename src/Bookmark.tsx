

export const create_sub_folder = (pid: string) => {
	chrome.bookmarks.create({
		parentId: pid,
		title: "New folder"
	});
}

export const update_bookmark = (id: string, title: string) => {
	chrome.bookmarks.update(id, { title }, () => {});
};
