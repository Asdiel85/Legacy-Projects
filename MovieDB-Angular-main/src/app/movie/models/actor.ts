export interface IActor {
  character: string;
  name: string;
  profile_path: string;
}

export interface IActors {
  cast: Array<IActor>;
}
