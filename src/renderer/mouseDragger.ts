import {Perspacetive} from '@/renderer/types';

/**
 * Attach mouse drag event handler to the canvas element
 * so that users are able to drag and scroll the element.
 */
export const attachDragger = (canvas: HTMLCanvasElement) => {
    let isDragging: boolean = false;
    const perspective: Perspacetive = {
        x: 0,
        y: 0,
    };

    canvas.onmousedown = (e) => {
        if (e.button !== 0) {
            return;
        }
        isDragging = true;
    };
    canvas.onmousemove = (e) => {
        if (!isDragging) {
            return;
        }
        isDragging = true;
        perspective.x += e.movementX;
        perspective.y += e.movementY;
    };
    canvas.onmouseleave = () => {
        isDragging = false;
    };
    canvas.onmouseup = (e) => {
        if (e.button !== 0) {
            return;
        }
        isDragging = false;
    };

    return perspective;
};
