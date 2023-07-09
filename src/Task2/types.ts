export type Section = {
  title: string;
  contents: string[];
}

export type FrameDuration = {
  start: number;
  duration: number;
}

export type OneVideoContent = {
  sections: Section[];
}

export type OneVideoProps = {
  totalFrames: number;
  titleAudioFiles: string[];
  titleFrames: FrameDuration[];
  contentAudioFiles: string[][];
  contentFrames: FrameDuration[][];
  mainIndex: number;
}
