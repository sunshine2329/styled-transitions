import {Sequence} from 'remotion'
import React from 'react';
import { Title } from './Title';
import { Content } from './Content';
import { FrameDuration, Section } from '../types';

export const OneSection: React.FC<{
    section: Section;
    orderIndex: number;
    index: number;
    titleAudioUrl: string;
    contentAudioUrls: string[];
    titleFrameDuration: FrameDuration;
    contentFrameDuration: FrameDuration[];
    imageCount: number;
    videoCount: number;
    contentSetID: string;
}> = ({section, orderIndex, index, titleAudioUrl, contentAudioUrls, titleFrameDuration, contentFrameDuration, imageCount, videoCount, contentSetID}) => {
    
    return (
        <>
            <Sequence key={`sub-seq-${index}`} durationInFrames={ titleFrameDuration.duration }>
                <Title 
                    key={`title-${index}`} 
                    titleText={section.title} 
                    index={ index } 
                    audioUrl={titleAudioUrl}
                    imageCount={imageCount}
                    orderIndex={orderIndex}
                    contentSetID={contentSetID}
                />
            </Sequence>
            {
                section.contents.map((content, subIndex) => {
                    return (
                        <Sequence 
                            key={`sub-seq-content-${index}-${subIndex}`} 
                            from={ contentFrameDuration[subIndex].start - titleFrameDuration.start - 5 }
                            durationInFrames={ contentFrameDuration[subIndex].duration + 5 }
                        >
                            <Content 
                                key={`content-${index}-${subIndex}`} 
                                contentText={content} 
                                index={ (index + 1) * (subIndex + 1) + 3 } 
                                audioUrl={contentAudioUrls[subIndex]}
                                imageCount={imageCount}
                                videoCount={videoCount}
                                contentSetID={contentSetID}
                            />
                        </Sequence>
                    )
                })
            }
        </>
    );
};
