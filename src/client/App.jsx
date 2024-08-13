import Header from "./components/Header";
import MainView from "./components/MainView";

function App() {
  return (
    <div className="flex flex-col md:h-[100vh]">
      <Header />
      <MainView />
    </div>
  );
}

export default App;
