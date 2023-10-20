import ListMovies from "./components/ListMovies";
import DetailMovie from "./pages/DetailMovie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="flex flex-col items-center gap-5 m-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListMovies />} />
            <Route path="/movie/:id" element={<DetailMovie />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
