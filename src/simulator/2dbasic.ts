import {Loc, Simulator} from '@/simulator/types';

const constraint = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

/**
 * This is the most basic, simple 2D simulator.
 * The simulator has velocity,
 */
export const getSimulator = (): Simulator => {
    let particles = [];
    const G = 5;
    const tickUnit = 0.1;
    const minDistance = 4;
    const maxDistance = 900;

    return {
        get particles () {
            return particles;
        },
        set particles (value) {
            particles = value;
        },
        G,
        tickUnit,
        next: () => {
            const nextLocs: Omit<Loc, 'z'>[] = [];
            for (const particle of particles) {
                const nextLoc: Omit<Loc, 'z'> = {
                    x: particle.x + particle.velX * tickUnit,
                    y: particle.y + particle.velY * tickUnit,
                };
                for (const other of particles) {
                    if (particle === other || !other.pullOthers) {
                        continue;
                    }
                    const distVector: Omit<Loc, 'z'> = {
                        x: other.x - particle.x,
                        y: other.y - particle.y,
                    };
                    // Constraint the values for good lookings.
                    const distance = constraint(
                        Math.pow(
                            Math.pow(distVector.x, 2) + Math.pow(distVector.y, 2),
                            1 / 2
                        ),
                        minDistance,
                        maxDistance
                    );

                    const massM = particle.mass * other.mass;
                    const force = G * massM / Math.pow(distance, 2);
                    const forceUnitVector: Omit<Loc, 'z'> = {
                        x: distVector.x / distance,
                        y: distVector.y / distance,
                    };
                    particle.velX += forceUnitVector.x * force / particle.mass * tickUnit;
                    particle.velY += forceUnitVector.y * force / particle.mass * tickUnit;
                }
                nextLocs.push({x: nextLoc.x, y: nextLoc.y});
            }
            for (const particle of particles) {
                if (!particle.movable) {
                    continue;
                }
                particle.x = nextLocs[particles.indexOf(particle)].x;
                particle.y = nextLocs[particles.indexOf(particle)].y;
            }
        }
    };
};
