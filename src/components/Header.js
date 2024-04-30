import { useContext } from "react";
import AuthContext from "../store/authContext";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <header>
      <nav>
        {state.token ? (
          <ul>
            <li>
              <button
                className="logout-btn"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="main-nav"></ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
