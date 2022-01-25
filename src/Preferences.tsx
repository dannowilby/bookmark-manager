
import React from 'react';

import { set_to_object, object_to_set } from './util';

/* USER PREFERENCES */

export interface UserStoredData {
	collapsed: Set<string>;
	pinned: Set<string>;
};

export const new_user_stored_data = (): UserStoredData => ({
	collapsed: new Set<string>(),
	pinned: new Set<string>(),
});

export const set_user_stored_data = (preferences: UserStoredData) => {
	const converted = { 
		...preferences, 
		collapsed: set_to_object(preferences.collapsed),
		pinned: set_to_object(preferences.pinned),
	};

	chrome.storage.sync.set({ 'stored': converted }) 
};

/**
 * Returns the loaded state or generates a new state and returns it
 */

const user_stored_data_exists = (data: object): boolean => (data.hasOwnProperty('stored'));

export const get_user_stored_data = (): Promise<UserStoredData> => 
	new Promise((resolve, reject) => chrome.storage.sync.get('stored', (data) => {

		if(!user_stored_data_exists(data)) {
			const t = new_user_stored_data();
			set_user_stored_data(t);
			resolve(t);
		}

		const collapsed = object_to_set(data.stored.collapsed);
		const pinned = object_to_set(data.stored.pinned);
		resolve({ ...data.stored, collapsed, pinned });
	})
);

/* PINNED */

export const is_pinned = (preferences: UserStoredData | null, id: string): boolean => {

	if(!preferences || !preferences.pinned)
		return false;
	
	return preferences.pinned.has(id);

};

export const update_pinned = (id: string) => {

	UserStoredData.then(preferences => {

		if(!preferences || !preferences.pinned)
			return false;
	
		if (preferences.pinned.has(id))
			preferences.pinned.delete(id);
		else
			preferences.pinned.add(id);

		set_user_stored_data(preferences);
	});

};

/* COLLAPSABLE */

export const is_collapsed = (preferences: UserStoredData | null, id: string): boolean => {

	if(!preferences || !preferences.collapsed)
		return false;
	
	return preferences.collapsed.has(id);

};

export const update_collapsed = (id: string) => {

	UserStoredData.then(preferences => {

		if(!preferences || !preferences.collapsed)
			return false;
	
		if (preferences.collapsed.has(id))
			preferences.collapsed.delete(id);
		else
			preferences.collapsed.add(id);

		set_user_stored_data(preferences);
	});

};


export const UserStoredData = get_user_stored_data(); 


