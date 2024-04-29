import PokeballPic from "../assets/PokeballPic.jpg";
import attackIcon from "../assets/attackIcon.png";
import speedIcon from "../assets/speedIcon.png";
import enduranceIcon from "../assets/enduranceIcon.png";
import shieldIcon from "../assets/shieldIcon.png";
import LogInIcon from "../assets/LogInIcon.png";
import { Link } from "react-router-dom";

const routes = [
  { path: "/", icon: PokeballPic, alt: "Pokeball" },
  { path: "/BestAttacks", icon: attackIcon, alt: "Attack" },
  { path: "/BestSpeed", icon: speedIcon, alt: "Speed" },
  { path: "/BestEndurance", icon: enduranceIcon, alt: "Endurance" },
  { path: "/BestDefense", icon: shieldIcon, alt: "Defense" },
  { path: "/LogInPage", icon: LogInIcon, alt: "Log-in" },
];

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        {routes.map((route) => (
          <Link to={route.path} key={route.path}>
            <img src={route.icon} alt={route.alt} />
          </Link>
        ))}
      </div>
    </header>
  );
}
