export type Simulator = {
    particles: Particle[];
    G: number;
    /** tick unit used when calculating next snapshot, in unit of second.  */
    tickUnit: number;
    next: () => unknown;
}

export type Particle = Loc & Velocity & {
    mass: number;
    size: number;
    movable: boolean;
    pullOthers: boolean;
    visible: boolean;
    color?: `#${string}`;
}

export type Loc = {
    x: number;
    y: number;
    z: number;
}

/** Velocities in unit of 1/s. */
export type Velocity = {
    velX: number;
    velY: number;
    velZ: number;
}
