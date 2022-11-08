export default function CurrentMeme({ memes, memeText, counter }) {
  return (
    <div className="meme-container">
      <h2 className="meme-text top">{memeText.textTop}</h2>
      {memes ? (
        <img
          className="meme"
          src={memes[counter].url}
          alt={memes[counter].name}
        />
      ) : (
        "...loading"
      )}
      <h2 className="meme-text bottom">{memeText.textBottom}</h2>
    </div>
  );
}
