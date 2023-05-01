import { useState, useRef, useCallback, useEffect } from 'react';
import Color from './Color';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState<string>("https://th.bing.com/th/id/OIP.Sbtp6DnO5KP7WVNuygzhZwHaFH?w=249&h=180&c=7&r=0&o=5&pid=1.7");
  const [height, setHeight] = useState<number>(500);
  const [width, setWidth] = useState<number>(500);
  const [angle, setAngle] = useState<number>(0);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [upperText, setUpperText] = useState<string>("");
  const [lowerText, setLowerText] = useState<string>("");
  const [color, setColor] = useState<string>("#FFF");

  const onClear = useCallback(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [canvasRef])

  useEffect(() => {
    onClear();

    const image: HTMLImageElement = new Image();
    image.src = url;
    let absoluteAngle = Math.abs(angle);
    image.onload = () => {

      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (canvas) {
        const canvasContext = canvas.getContext("2d");
        canvasContext?.save();
  
        let imageWidth: number = width || image.width;
        let imageHeight: number = height || image.height;
  
        canvasContext?.rotate(absoluteAngle * Math.PI / 180);
  
        if (absoluteAngle === 90) {
          imageWidth *= -1
        }
        if (absoluteAngle === 180) {
          imageHeight *= -1
          imageWidth *= -1
        }
        if (absoluteAngle === 270) {
          imageHeight *= -1
        }
  
        if (isReversed) {
          canvasContext?.scale(-1, 1);
          if (absoluteAngle === 90 || absoluteAngle === 270) {
            imageHeight *= -1
          } else {
            imageWidth *= -1
          }
        }
  
        if (absoluteAngle === 90 || absoluteAngle === 270) {
          canvasContext?.drawImage(image, 0, 0, imageHeight, imageWidth);
        } else {
          canvasContext?.drawImage(image, 0, 0, imageWidth, imageHeight);
        }
        canvasContext?.restore();
  
        if (canvasContext) {
          canvasContext.font = 'Bold 40px Impact';
          canvasContext.fillStyle = color
          canvasContext.strokeStyle = 'black'
          canvasContext.textBaseline = 'top';
          canvasContext.textAlign = 'center'
          
          canvasContext.strokeText(upperText, Math.abs(imageWidth / 2), Math.abs(imageHeight / 9))
          canvasContext.fillText(upperText, Math.abs(imageWidth / 2), Math.abs(imageHeight / 9))

          canvasContext.strokeText(lowerText, Math.abs(imageWidth / 2), Math.abs(imageHeight - (imageHeight / 4.5)))
          canvasContext.fillText(lowerText, Math.abs(imageWidth / 2), Math.abs(imageHeight - (imageHeight / 4.5)))
        }
      }
    }
  }, [width, height, url, angle, isReversed, upperText, lowerText, color]);

  return (
    <div className="App">
      <header className="App-header">
        <h4>Meme Generator</h4>
      </header>

      <form>
        <div className="row">
          <label>
            Image Source:
            <input onChange={e => setUrl(e.target.value)} value={url} />
          </label>
        </div>

        <div className="row">
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

        <div className="buttons row">
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

        <label style={{ justifyContent: 'space-around', margin: '1rem' }}>
          Font Color:
          <Color setColor={setColor} color={color} />
        </label>

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

      </form>
    </div>
  );
}

export default App;
