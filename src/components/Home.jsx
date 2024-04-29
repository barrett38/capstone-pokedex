import { Route, Routes } from "react-router-dom";
// import ProfileEntry from "./Login/ProfileEntry.jsx";

import {
  AllPokemon,
  BestAttacks,
  BestSpeed,
  BestEndurance,
  BestDefense,
} from "./AllPokemon.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AllPokemon />} />
      <Route path="/BestAttacks" element={<BestAttacks />} />
      <Route path="/BestSpeed" element={<BestSpeed />} />
      <Route path="/BestEndurance" element={<BestEndurance />} />
      <Route path="/BestDefense" element={<BestDefense />} />
      {/* Auth Page will probably go here */}
      {/* <Route path="/LogInPage" element={<ProfileEntry />} />{" "} */}
    </Routes>
  );
}
