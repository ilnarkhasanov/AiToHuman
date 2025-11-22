import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-linear-to-b from-purple-200 to-white min-h-screen">
        <Header />
        <div className="mx-4 rounded-2xl bg-white">
          <Router />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
