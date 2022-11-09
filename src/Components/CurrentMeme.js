import { upload } from "@testing-library/user-event/dist/upload";

export default function CurrentMeme({
  memes,
  memeText,
  counter,
  upload,
  myImage,
}) {
  return (
    <div ref={myImage} className="meme-container">
      <h2 className="meme-text top">{memeText.textTop}</h2>
      {memes ? (
        <img
          className="meme"
          src={!upload ? memes[counter].url : upload.url}
          alt={!upload ? memes[counter].name : upload.name}
        />
      ) : (
        "...loading"
      )}
      <h2 className="meme-text bottom">{memeText.textBottom}</h2>
    </div>
  );
}
