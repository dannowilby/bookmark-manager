
import React from 'react';

import styles from './styles.scss';

const SearchBar = () => {


	return (
	
		<div className={styles.container}>
			<div className={styles.search}>
				<input type="text" placeholder="Search bookmarks..." />
				<div>
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="24" height="24" 
						viewBox="0 0 24 24" 
						fill="none" 
						stroke="#000000" 
						strokeWidth="2" 
						strokeLinecap="round" 
						strokeLinejoin="round"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
