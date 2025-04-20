import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UTDTrends from "./pages/UTDTrends";
import TrendsGPT from "./pages/TrendsGPT";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<UTDTrends />} />
                    <Route path="/trendsgpt" element={<TrendsGPT />} />
                </Route>
            </Routes>
        </Router>
  );
}

export default App;
