import { useState, useEffect, useRef } from "react";
const axios = require("axios");

function ShortPolling(params) {
  let [massage, setMassage] = useState("");
  let [massages, setMassages] = useState([]);
  let [newMassage, setNewMassage] = useState([]);
  let lastUpdate = useRef(0);

  function handleSubmit(event) {
    event.preventDefault();
    const createdAt = Date.now();
    axios
      .post("http://localhost:5000/shortpolling/massages", {
        massage: massage,
        createdAt: createdAt,
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
    setInterval(() => {
      const currentDate = Date.now();
      axios
        .get("http://localhost:5000/shortpolling/massages/subscribe", {
          params: {
            lastupdate: lastUpdate.current,
          },
        })
        .then((response) => {
          // handle success
          console.log(response.data.length);
          console.log(response.data);
          lastUpdate.current = currentDate;
          setNewMassage(response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }, 5000);
  }, []);

  useEffect(() => {
    setMassages(massages.concat(newMassage));
  }, [newMassage]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5">
          <h3>Short Polling</h3>
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
          {massages.length !== 0
            ? massages.map((m, i) => <li key={i}>{m.massage}</li>)
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShortPolling;
