import { Stop } from "./Stop";

export interface Schedule {
  id: string;
  routeName: string;
  stop1: string;
  stop2: string;
  stop3: string;
  stop4: string;
  stops: Stop[];
}
