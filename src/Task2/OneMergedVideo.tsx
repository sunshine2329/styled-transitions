import { Sequence, Audio, staticFile } from 'remotion'
import React from 'react';
import { OneSection } from './Components/OneSection';
import { FrameDuration, Section } from './types';

export const OneMergedVideo: React.FC<{
	titleAudioFiles: string[];
	contentAudioFiles: string[][];
    titleFrameCount: FrameDuration[];
    contentFrameCount: FrameDuration[][];
    sections: Section[];
    videoCount: number;
    imageCount: number;
    mainIndex: number;
    contentSetID: string;
}> = ({titleAudioFiles, contentAudioFiles, titleFrameCount, contentFrameCount, sections, videoCount, imageCount, mainIndex, contentSetID}) => {
    console.log('DEBUG:', imageCount, videoCount, contentSetID)
    return (
        titleFrameCount.length > 0 ?
            <>
                <Audio key='background-sound' src={staticFile("audios/background.mp3")} volume={0.05}/>
                {sections.map((section, index) => {
                    const durationInFrames = contentFrameCount[index].reduce((partialSum, a) => partialSum + a.duration, 0);
                    return (
                        <Sequence key={`seq${index}`}
                            from={ titleFrameCount[index].start }
                            durationInFrames={titleFrameCount[index].duration + durationInFrames}
                        >
                            <OneSection
                                key={`one-section-${index}`}
                                section={section}
                                index={ (index + 1) * (mainIndex + 1) + 4 }
                                titleAudioUrl={titleAudioFiles[index]}
                                contentAudioUrls={contentAudioFiles[index]}
                                titleFrameDuration={titleFrameCount[index]}
                                contentFrameDuration={contentFrameCount[index]}
                                videoCount={videoCount}
                                imageCount={imageCount}
                                orderIndex= {index}
                                contentSetID={contentSetID}
                            />
                        </Sequence>
                    )
                })}
            </>
        : <></>
    );
};
