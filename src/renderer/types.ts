import {Simulator} from '@/simulator/types';

export type Renderer = {
  render: (simulator: Simulator) => unknown;
}

export type Perspacetive = {
  x: number;
  y: number;
}
