import "./App.css";
import { useEffect, useState } from "react";
import CurrentMeme from "./Components/CurrentMeme";

export default function App() {
  const url = "https://api.imgflip.com/get_memes";
  const [memes, setMemes] = useState();
  const [memeText, setMemeText] = useState({
    textTop: "",
    textBottom: "",
  });
  const [counter, setCounter] = useState(0);

  console.log(memeText);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes))
      .catch((err) => console.log(err));
  }, []);

  const handleMemeText = (event) => {
    event.preventDefault();
    setMemeText({
      textTop: event.target.textTop.value,
      textBottom: event.target.textBottom.value,
    });
    event.target.textTop.value = "";
    event.target.textBottom.value = "";
  };

  const next = () => {
    setCounter(counter + 1);
  };

  const previous = () => {
    setCounter(counter - 1);
  };

  return (
    <div className="App">
      <h1>Meme Generator</h1>
      <CurrentMeme memes={memes} memeText={memeText} counter={counter} />
      <form onSubmit={handleMemeText}>
        <input type="text" name="textTop" />
        <input type="text" name="textBottom" />
        <button>Confirm</button>
      </form>

      <button onClick={previous}>Previous</button>
      <button onClick={next}>Next</button>
      {console.log(counter)}
    </div>
  );
}
