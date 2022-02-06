import React from 'react';

import styles from './styles.scss';

interface PinnedProps {

  className: string;

};

const Pinned = ({ className }: PinnedProps) => {

  return (
    <div className={className}>
      <p className={styles.title}>Pinned</p>
    </div>
  );

};

export default Pinned;
