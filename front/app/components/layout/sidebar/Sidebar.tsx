
import { FC } from 'react';
import Search from './search/Search';
import styles from './sidebar.module.scss';
const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Search/>
    </aside>
  );
};

export default Sidebar;