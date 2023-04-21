export interface Schedule {
  id: string;
  routeName: string;
  stops: Map<string, number>;
}

