import "./App.css";
import Advice from "./Components/Advice";
import Button from "./Components/Button";
import { useState, useReducer, useEffect } from "react";

function App() {
  const [advice, setAdvice] = useState([]);
  const initialId = Math.floor(Math.random()* 200) +1;

  const reducer = (id, action) => {
    switch (action.type) {
      case "Previous":
        return id - 1;

      case "Next":
        return id + 1;
    }
  };
  const [id, dispatch] = useReducer(reducer, initialId);

  useEffect(() => {
    fetch(`https://api.adviceslip.com/advice/${id}`)
      .then((res) => res.json())
      .then((data) =>
        data.slip
          ? setAdvice(data.slip)
          : window.alert(
              `Sorry kiddo, seems like advice #${id} has been canceled! While we fix this issue take this advice: forget about it an move on, to the next advice and beyond!`
            )
      );
  }, [id]);

  return (
    <div className="App">
      <Advice>
        <h3>Advice #{advice.id}</h3>
        <h1>{advice.advice}</h1>
        <Button
          onBtnClick={() => dispatch({ type: "Previous" })}
          disabled={id === initialId ? true : false}
          textContent="Previous"
          className="prevBtn"
        />
        <Button
          onBtnClick={() => dispatch({ type: "Next" })}
          disabled={id === initialId + 99 ? true : false}
          textContent="Next"
          className="nextBtn"
        />
      </Advice>
    </div>
  );
}

export default App;
