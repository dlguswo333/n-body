import {Simulator} from '@/simulator/types';

export type Renderer = {
  render: (simulator: Simulator) => unknown;
}
