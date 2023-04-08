export interface Schedule {
    id: string;
    start_time: Date;
    end_time: Date;
    route: string[];
    stops: string[];
  }