import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={s.navContainer}>
      <div className={s.logo}>Movie Searchers</div>
      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink className={s.navLink} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={s.navLink} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
