
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

export const set_preferences = (preferences: UserPreferences) => {
	const converted = { ...preferences, collapsed: set_to_object(preferences.collapsed) };
	chrome.storage.sync.set({ "preferences": converted }) 
};

/**
 * Returns the loaded state or generates a new state and returns it
 */

export const get_preferences = (): Promise<UserPreferences> => new Promise((resolve, reject) => chrome.storage.sync.get('preferences', (data) => {
		const collapsed = object_to_set(data.preferences.collapsed);
		resolve({ ...data.preferences, collapsed });
}));

/* COLLAPSABLE */

export const is_preference_collapsed = (preferences: UserPreferences | null, id: string): boolean => {

	if(!preferences || !preferences.collapsed)
		return false;
	
	return preferences.collapsed.has(id);

};

export const update_collapsed_preferences = (id: string) => {

	Preferences.then(preferences => {

		if(!preferences || !preferences.collapsed)
			return false;
	
		if (preferences.collapsed.has(id))
			preferences.collapsed.delete(id);
		else
			preferences.collapsed.add(id);

		set_preferences(preferences);
	});

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

export const Preferences = get_preferences(); 
