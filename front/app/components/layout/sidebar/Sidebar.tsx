
import { FC } from 'react';
import MoviesContainer from './moviesContainer/MoviesContainer';
import Search from './search/Search';
import styles from './sidebar.module.scss';
const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Search/>
      <MoviesContainer/>
    </aside>
  );
};

export default Sidebar;