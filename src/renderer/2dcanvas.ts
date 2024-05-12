import {Renderer} from '@/renderer/types';

/**
 * The most basic, simple render using 2d canvas HTML element.
 */
export const getRenderer = (width: number, height: number): Renderer => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    return {
        render: (simulator) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of simulator.particles) {
                if (!particle.visible) {
                    continue;
                }
                ctx.beginPath();
                ctx.moveTo(particle.x + particle.size, particle.y);
                ctx.strokeStyle = `${particle.color || '#000'}`;
                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    2 * Math.PI
                );
                ctx.stroke();
            }
        },
    };
};
