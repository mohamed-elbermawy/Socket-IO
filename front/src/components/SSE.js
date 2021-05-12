import { useState, useEffect } from "react";
const axios = require("axios");

function SSE(params) {
  let [massage, setMassage] = useState("");
  let [massages, setMassages] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/sse/massages", {
        massage: massage,
      })
      .then((response) => {
        // handle success
        // console.log(response);
        setMassage("");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    const sse = new EventSource("http://localhost:5000/sse/massages/subscribe");
    sse.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMassages((prev) => prev.concat(data));
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5">
          <h3>SSE (Server Side Events)</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="massage"
                placeholder="Enter your massage"
                value={massage}
                onChange={(e) => setMassage(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          {massages.map((m, i) => (
            <li key={i}>{m.massage}</li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SSE;
