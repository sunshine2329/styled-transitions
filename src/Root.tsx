import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { useCallback, useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { MovingBackground } from './Task/MovingBackground';
import { OneTextAnimation } from './Task/OneTextAnimation';
import { TwoAnimation } from './Task/TwoAnimation';
import { TwoMovingAnimation } from './Task/TwoMovingAnimation';
import { VideoAnimation } from './Task/VideoAnimation';
import { OneMergedVideo } from './Task2/OneMergedVideo';
import multipleVideos from './Task2/sections.json'
import { FrameDuration, OneVideoProps } from './Task2/types';
import { textToSpeech } from './Task2/Utils/TextToSpeech';
// Each <Composition> is an entry in the sidebar!
const fps = 30;
const extraSecondsPerSection = 1; // Seconds
const extraSecondsPerContent = 0.5; // Seconds
const videoFilesCount = 10; // After adding video(mp4) files, you should increase this count
const imageFilesCount = 33; // After adding image(jpg) files, you should increase this count
const contentSetID = "1";

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [allVideosProps, setAllVideosProps] = useState<OneVideoProps[]>([]);

  const fetchTts = useCallback(async () => {
    const allVideosPropsTemp: OneVideoProps[] = [];

    for (const oneVideoContent of multipleVideos) {
      let sumDurations = 0;
      const titleSpeechesTemp : string[] = [];
      const titleFramesTemp : FrameDuration[] = [];
      const contentSpeechesTemp : string[][] = [];
      const contentFramesTemp : FrameDuration[][] = [];
      for (const section of oneVideoContent.sections) {
        // Convert text to speech and upload aws for title
        const titleSpeech = await textToSpeech(section.title, 'enUSWoman1');
        titleSpeechesTemp.push(titleSpeech);

        const titleDuration = await getAudioDurationInSeconds(
          titleSpeech
        );
        const durTitle = Math.floor(titleDuration + extraSecondsPerSection) * fps;
        titleFramesTemp.push({ start: sumDurations, duration: durTitle });

        sumDurations += durTitle;

        // Convert text to speech and upload aws for content
        const contentSpeechFileTemp: string[] = [];
        const contentFrameCountTemp: FrameDuration[] = [];
        for (const content of section.contents) {
          const contentSpeech = await textToSpeech(content, 'enUSWoman1');
          contentSpeechFileTemp.push(contentSpeech);

          const contentDuration = await getAudioDurationInSeconds(
            contentSpeech
          );
          const durContent = Math.floor(contentDuration + extraSecondsPerContent) * fps;
          contentFrameCountTemp.push({ start: sumDurations, duration: durContent });
          sumDurations += durContent;
        }
        contentSpeechesTemp.push(contentSpeechFileTemp);
        contentFramesTemp.push(contentFrameCountTemp);
      }
      console.log('total frames', sumDurations);
      const oneVideoProps: OneVideoProps = {
        totalFrames: sumDurations,
        titleAudioFiles: titleSpeechesTemp,
        titleFrames: titleFramesTemp,
        contentAudioFiles: contentSpeechesTemp,
        contentFrames: contentFramesTemp,
        mainIndex: oneVideoContent.order
      }
      allVideosPropsTemp.push(oneVideoProps);
    }
    setAllVideosProps(allVideosPropsTemp);
    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchTts();
  }, [fetchTts]);

  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="MovingBackground"
        component={MovingBackground}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          titleText: 'Title number four about computers',
          titleNumber: '6',
          titleColor: 'white',
        }}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="TwoAnimation"
        component={TwoAnimation}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          titleText: 'The design of \nshoes has varied \nenormously \nthrough time and \nfrom culture to \nculture, with form \noriginally being \ntied to function.',
          titleColor: 'white',
        }}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="OneTextAnimation"
        component={OneTextAnimation}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          titleText: 'A shoe is an item of footwear \nintended to protect and comfort \nthe human foot.',
          titleColor: 'white',
        }}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="VideoAnimation"
        component={VideoAnimation}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          titleText: 'A computer is a machine \nthat can be programmed to \ncarry out sequences of \narithmetic or logical \noperations(computation) \nautomatically.',
          titleColor: 'black',
          firstBackColor: '#498FFF',
          secondBackColor: 'white',
        }}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="TwoMovingAnimation"
        component={TwoMovingAnimation}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          titleText: 'Title number four about computers',
          titleColor: 'red',
        }}
      />
      {
        multipleVideos.map((videoProps, index) => {
          return (
            <Composition
              // You can take the "id" to render a video:
              // npx remotion render src/index.ts <id> out/video.mp4
              key={`cp-video-${index}`}
              id={`OneMergedVideo${index + 1}`}
              component={OneMergedVideo}
              durationInFrames={allVideosProps.length > 0 ? allVideosProps[index].totalFrames : 10}
              fps={fps}
              width={1280}
              height={720}
              defaultProps={{
                titleAudioFiles: allVideosProps.length > 0 ? allVideosProps[index].titleAudioFiles: [],
                contentAudioFiles: allVideosProps.length > 0 ? allVideosProps[index].contentAudioFiles: [],
                titleFrameCount: allVideosProps.length > 0 ? allVideosProps[index].titleFrames : [],
                contentFrameCount: allVideosProps.length > 0 ? allVideosProps[index].contentFrames : [],
                sections: videoProps.sections,
                videoCount: videoFilesCount,
                imageCount: imageFilesCount,
                mainIndex: allVideosProps.length > 0 ? allVideosProps[index].mainIndex : 0,
                contentSetID,
              }}
            />
          )
        })
      }
    </>
  );
};
