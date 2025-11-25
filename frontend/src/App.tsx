import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Router />
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
