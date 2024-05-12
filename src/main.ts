import {getRenderer} from '@/renderer/2dcanvas';
import {getSimulator} from '@/simulator/2dbasic';
import {Particle} from '@/simulator/types';

const getParticles = () => {
    const createRandomParticle = (): Particle => ({
        x: 500,
        y: 400 + Math.random() * 250,
        z: 0,
        velX: Math.random() * 10,
        velY: 0,
        velZ: 0,
        mass: 7,
        size: 2,
        movable: true,
        pullOthers: false,
        visible: true,
    });
    const particles = Array.from({length: 400}, createRandomParticle);
    particles.push({
        x: 500,
        y: 500,
        z: 0,
        velX: 0,
        velY: 0,
        velZ: 0,
        mass: 300,
        size: 20,
        movable: false,
        pullOthers: true,
        visible: true,
        color: '#0f0'
    });

    return particles;
};

async function main () {
    const renderer = getRenderer(1000, 1000);
    const simulator = getSimulator();

    simulator.particles = getParticles();

    /**
     * Simple bool value would work in most cases,
     * but what if start button gets pressed right after pause button does?
     * Since the old and new onclick functions only check if runFlag is true,
     * both of them may continue running.
     */
    let runFlag = null;
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    startButton.onclick = async () => {
        if (runFlag) {
            return;
        }
        const mySymbol = Symbol();
        runFlag = mySymbol;
        while (runFlag === mySymbol) {
            renderer.render(simulator);
            simulator.next();
            await new Promise(res => setTimeout(res, 20));
        }
    };
    pauseButton.onclick = () => {
        runFlag = null;
    };
}
main();
