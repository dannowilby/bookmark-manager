
import React from 'react';

export interface BookmarkProps {
	bookmarks: chrome.bookmarks.BookmarkTreeNode | null;
};

/* USER PREFERENCES */

export interface UserPreferences {
	collapsed: Set<string>;
};

export const new_preferences = (): UserPreferences => ({
	collapsed: new Set<string>()
});


/**
 * Used for loading the inital state in the App component
 */
export const init_preferences = (): UserPreferences => {

	const prefs = get_preferences();
	
	set_preferences(prefs);

	console.log(prefs);

	return prefs;
};

export const set_preferences = (preferences: UserPreferences) => (
	chrome.storage.sync.set({ test: "t" }) // Make this work
);

/**
 * Returns the loaded state or generates a new state and returns it
 */
export const get_preferences = (): UserPreferences => {

	let t = new_preferences();

	chrome.storage.sync.get('preferences', (data) => {
		Object.assign(t, {}); // Make this work
	});

	return t;
};

/* COLLAPSABLE */

export const is_preference_collapsed = (preferences: UserPreferences | null, id: string): boolean => {

	if(!preferences || !preferences.collapsed)
		return false;
	
	return preferences.collapsed.has(id);

};

export const update_collapsed_preferences = (preferences: UserPreferences, id: string) => {

	if(!preferences || !preferences.collapsed)
		return false;
	
	if (preferences.collapsed.has(id))
		preferences.collapsed.delete(id);
	else
		preferences.collapsed.add(id);

	set_preferences(preferences);
};

/* HELPER FUNCTIONS */

const set_to_object = (set: Set<string>): object => {

	let t = {};

	for (let v in set.values()) {
		t = { ...t, [v]: true };
	}

	return t;

};

const object_to_set = (object: object): Set<string> => {
	
	let t = new Set<string>();

	for (let k in Object.keys(object)) {
		t.add(k);
	}

	return t;
};
