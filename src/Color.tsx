import React from 'react';
import { SketchPicker } from 'react-color';

interface ColorPickerButtonProps {
    setColor: (color: string) => void
}

const ColorPickerButton = (props: ColorPickerButtonProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <div>
            <button onClick={toggleIsOpen}>Pick Color</button>
            {isOpen ? (
                <div style={{
                    position: 'absolute',
                    zIndex: '2',
                }}>
                    <div style={{ 
                        position: 'fixed',
                        top: '0px',
                        bottom: '0px',
                        right: '0px',
                        left: '0px',
                    }} />
                    <SketchPicker
                        onChangeComplete={color => props.setColor(color.hex)}
                    />
                </div>

            ) : null}
        </div>
    )
}

export default ColorPickerButton;
