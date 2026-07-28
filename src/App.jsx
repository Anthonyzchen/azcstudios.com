import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudioLayout from "./pages/StudioLayout";
import Home from "./pages/Home";
import RecallGuard from "./pages/RecallGuard";
import RecallGuardPrivacy from "./pages/RecallGuardPrivacy";
import RecallGuardTerms from "./pages/RecallGuardTerms";
import RecallGuardSupport from "./pages/RecallGuardSupport";
import NotFound from "./pages/NotFound";

// Refreshing a deep route should land at the top of that route, not wherever
// the browser last had the scroll position.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<StudioLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recallguard" element={<RecallGuard />} />
          <Route path="/recallguard/privacy" element={<RecallGuardPrivacy />} />
          <Route path="/recallguard/terms" element={<RecallGuardTerms />} />
          <Route path="/recallguard/support" element={<RecallGuardSupport />} />
          {/* Inside the layout so a lost visitor still gets header + footer
              to navigate from, rather than a bare page. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
