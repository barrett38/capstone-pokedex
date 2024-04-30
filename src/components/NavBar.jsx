import PokeballPic from "../assets/PokeballPic.jpg";
import attackIcon from "../assets/attackIcon.png";
import speedIcon from "../assets/speedIcon.png";
import enduranceIcon from "../assets/enduranceIcon.png";
import shieldIcon from "../assets/shieldIcon.png";
import LogInIcon from "../assets/LogInIcon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

const routes = [
  { path: "/", icon: PokeballPic, alt: "Pokeball" },
  { path: "/BestAttacks", icon: attackIcon, alt: "Attack" },
  { path: "/BestSpeed", icon: speedIcon, alt: "Speed" },
  { path: "/BestEndurance", icon: enduranceIcon, alt: "Endurance" },
  { path: "/BestDefense", icon: shieldIcon, alt: "Defense" },
  { path: "/auth", icon: LogInIcon, alt: "Log-in" },
];

export default function NavBar() {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <header>
      <div id="title">
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
        {routes.map((route) => (
          <Link to={route.path} key={route.path}>
            <img src={route.icon} alt={route.alt} />
          </Link>
        ))}
      </div>
    </header>
  );
}
