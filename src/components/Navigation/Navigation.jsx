import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <p>MovieSearchers</p>
      </div>
      <nav>
        <ul className={s.ul}>
          <li>
            <NavLink className={s.navlink} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={s.navlink} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
