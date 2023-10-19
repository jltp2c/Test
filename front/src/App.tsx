import ListMovies from "./components/ListMovies";

function App() {
  return (
    <>
      <main className="flex flex-col items-center gap-5 m-10">
        <h1 className="text-5xl">Movies</h1>
        <ListMovies />
      </main>
    </>
  );
}

export default App;
