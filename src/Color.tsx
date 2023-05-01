import React from 'react';
import { SketchPicker } from 'react-color';
import './Color.css';

interface ColorPickerButtonProps {
  setColor: (color: string) => void,
  color: string,
}

const ColorPickerButton = (props: ColorPickerButtonProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div>
        <button type="button" onClick={toggleIsOpen}>Pick Color</button>
        {isOpen ? (
          <div className="pop-over">
            <div className="cover" />
            <SketchPicker
              color={props.color}
              onChangeComplete={color => props.setColor(color.hex)}
            />
          </div>

        ) : null}
    </div>
  )
}

export default ColorPickerButton;
