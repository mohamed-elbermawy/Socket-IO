import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import LongPolling from "./components/Long.polling";
import ShortPolling from "./components/short.polling";
import Socket from "./components/socket";
import SSE from "./components/SSE";

function App() {
  return (
    <>
      {/*<LongPolling />
      <ShortPolling />
      <SSE />*/}
      <Socket />
    </>
  );
}

export default App;
