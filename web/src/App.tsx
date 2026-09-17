import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LiveMarket from "./pages/LiveMarket";
import Recommendations from "./pages/Recommendations";
import CreativeStudio from "./pages/CreativeStudio";
import Campaigns from "./pages/Campaigns";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="live-market" element={<LiveMarket />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="creative-studio" element={<CreativeStudio />} />
          <Route path="campaigns" element={<Campaigns />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
