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
  const [upload, setUpload] = useState();

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
  // Upload picture
  const handleUpload = (event) => {
    console.log(event.target.files);
    setUpload({
      name: event.target.files[0].name,
      url: URL.createObjectURL(event.target.files[0]),
    });
  };
  console.log("upload", upload);

  return (
    <div className="App">
      <h1>Create your Own Meme!</h1>
      <CurrentMeme
        memes={memes}
        memeText={memeText}
        counter={counter}
        upload={upload}
      />
      <form onSubmit={handleMemeText}>
        <input type="text" name="textTop" placeholder="Text for Top" />
        <input type="text" name="textBottom" placeholder="Text for Bottom" />
        <button className="confirm-btn">Confirm</button>
      </form>

      <div className="button">
        <button className="btn-previous btn" onClick={previous}>
          Previous
        </button>
        <button className="btn-next btn" onClick={next}>
          Next
        </button>
      </div>
      <input className="btn-file" type="file" onChange={handleUpload} />
    </div>
  );
}
