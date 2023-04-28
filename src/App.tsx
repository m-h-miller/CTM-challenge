import React from 'react';
import Color from './Color';
import './App.css';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = React.useState<string>("https://media1.popsugar-assets.com/files/thumbor/YX-2J4ndcYxiFDtqpJ0Ed8NkMfM/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2014/08/08/878/n/1922507/9ed5cdef48c5ef69_thumb_temp_image32304521407524949/i/Funny-Cat-GIFs.jpg");
  const [height, setHeight] = React.useState<number>(500);
  const [width, setWidth] = React.useState<number>(500);
  const [angle, setAngle] = React.useState<number>(0);
  const [isReversed, setIsReversed] = React.useState<boolean>(false);
  const [upperText, setUpperText] = React.useState<string>("");
  const [lowerText, setLowerText] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");

  const onImgUpload = () => {
    const image = new Image();
    image.src = url;

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      
      const imageWidth: number = width || image.width;
      const imageHeight: number = height || image.height;
      
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      canvasContext?.drawImage(image, 0, 0, imageWidth, imageHeight);
    }
  }

  const onClear = () => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  React.useEffect(() => {
    onClear();

    const image = new Image();
    image.src = url;

    let absoluteAngle = Math.abs(angle);

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      canvasContext?.save();

      let imageWidth: number = width || image.width;
      let imageHeight: number = height || image.height;

      canvasContext?.translate(canvas.width , canvas.height );
      canvasContext?.rotate(absoluteAngle *Math.PI / 180);

      if (absoluteAngle == 90) {
        imageWidth *= -1

      }
      if (absoluteAngle == 270) {
        imageHeight *= -1
      }
      if (absoluteAngle == 0) {
        imageHeight *= -1
        imageWidth *= -1
      }

      if (isReversed) {
        canvasContext?.scale(-1, 1);
        imageWidth *= -1
      }

      canvasContext?.drawImage(image, 0, 0, imageWidth, imageHeight);
      canvasContext?.restore();

      if (canvasContext) {
        canvasContext.font = 'Bold 40px Arial';
        canvasContext.fillStyle = color
        canvasContext.strokeStyle = 'black'
        canvasContext.textBaseline = 'top';
        canvasContext.fillText(upperText, Math.abs(imageWidth / 9), Math.abs(imageHeight / 9))
        canvasContext.fillText(lowerText, Math.abs(imageWidth / 9), Math.abs(imageHeight - (imageHeight / 4.5)))
      }
    }
  }, [width, height, url, angle, isReversed, upperText, lowerText, color]);

  return (
    <div className="App">
      <header className="App-header">
        <h4>Meme Generator</h4>
      </header>

      <form>
        <label>
          Image Source:
          <input onChange={e => setUrl(e.target.value)} value={url} />
        </label>

        <div  className="row">
          <label className="col">
            Height:
            <input type="number" onChange={e => setHeight(parseInt(e.target.value))} value={height} />
          </label>

          <label className="col">
            Width:
            <input type="number" onChange={e => setWidth(parseInt(e.target.value))} value={width} />
          </label>
        </div>

        <canvas id="canvas" ref={canvasRef} width={width} height={height} />

        <div className="buttons">
          <button
            type="button" 
            onClick={() => setAngle((angle - 90) % 360)}
          >
              Rotate Image
            </button>
          <button
            type="button" 
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse Image
          </button>
        </div>

        <div className="row">
          <label className="col">
            Upper Text:
            <textarea
              placeholder="Upper text"
              onChange={e => setUpperText(e.target.value)}
              value={upperText}
            />
          </label>

          <label className="col">
            Lower Text:
            <textarea
              placeholder="Lower text"
              onChange={e => setLowerText(e.target.value)}
              value={lowerText}
            />
          </label>
        </div>

        <label style={{ justifyContent: 'space-around'}}>
          Font Color:
          <Color setColor={setColor} />
        </label>

        <div className="buttons">
          <button type="button" onClick={onImgUpload}>Upload</button>
          <button type="button" onClick={onClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default App;
