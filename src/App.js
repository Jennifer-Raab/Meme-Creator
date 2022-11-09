import "./App.css";
import { useEffect, useState, useRef } from "react";
import CurrentMeme from "./Components/CurrentMeme";
import domtoimage from "dom-to-image";

export default function App() {
  const myImage = useRef();

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

  // Upload Logik
  const handleUpload = (event) => {
    console.log(event.target.files);
    setUpload({
      name: event.target.files[0].name,
      url: URL.createObjectURL(event.target.files[0]),
    });
  };
  console.log("upload", upload);

  // Download Logik
  const handleDownload = () => {
    console.log("ref", myImage.current);
    domtoimage
      .toJpeg(myImage.current, {
        quality: 0.95,
        style: { margin: "0" },
      })
      .then(function (dataUrl) {
        let link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  //Reset Function
  const handleReset = () => {
    setUpload();
    setMemeText({
      textTop: "",
      textBottom: "",
    });
    setCounter(0);
  };

  return (
    <div className="App">
      <h1>Create your Own Meme!</h1>
      <CurrentMeme
        memes={memes}
        memeText={memeText}
        counter={counter}
        upload={upload}
        myImage={myImage}
      />
      <form onSubmit={handleMemeText}>
        <input type="text" name="textTop" placeholder="Text for Top" />
        <input type="text" name="textBottom" placeholder="Text for Bottom" />
        <button className="confirm-btn btn">Confirm</button>
      </form>

      <input type="file" onChange={handleUpload} />

      <div className="allBtn">
        <button className="btn" onClick={handleDownload}>
          Save
        </button>
        <button disabled={counter < 1} className="btn" onClick={previous}>
          &#x2190;
        </button>
        <button disabled={counter > 98} className="btn" onClick={next}>
          &#x2192;
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
