import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/authContext";
import Auth from "./components/Auth";
// import Form from "./components/Form";
import Profile from "./components/Profile";
import {
  AllPokemon,
  BestAttacks,
  BestSpeed,
  BestEndurance,
  BestDefense,
} from "./components/AllPokemon";

const App = () => {
  const { state } = useContext(AuthContext);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/auth"
          element={!state.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={state.token ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/" element={<AllPokemon />} />
        <Route path="/BestAttacks" element={<BestAttacks />} />
        <Route path="/BestSpeed" element={<BestSpeed />} />
        <Route path="/BestEndurance" element={<BestEndurance />} />
        <Route path="/BestDefense" element={<BestDefense />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
