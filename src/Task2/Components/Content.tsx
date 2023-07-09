import {Audio} from 'remotion'
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { getRandom, getWordLines } from '../Utils/utils';
import { OneTextAnimation } from './Childs/OneTextAnimation';
import { TwoAnimation } from './Childs/TwoAnimation';
import { TwoMovingAnimation } from './Childs/TwoMovingAnimation';
import { VideoAnimation } from './Childs/VideoAnimation';

export const Content: React.FC<{
	contentText: string;
	index: number;
    audioUrl: string;
    imageCount: number;
    videoCount: number;
    contentSetID: string;
}> = ({contentText, index, audioUrl, imageCount, videoCount, contentSetID}) => {
    console.log(videoCount, 'Content')
    const childs = [
        <OneTextAnimation key={index + 99} titleText={contentText} index={index + 11} imageCount={imageCount} contentSetID={contentSetID}/>, 
        <TwoAnimation  key={index + 122} titleText={contentText} index={index + 12} imageCount={imageCount} contentSetID={contentSetID}/>, 
        <TwoMovingAnimation  key={index+ 234} titleText={contentText} index={index + 14} imageCount={imageCount} contentSetID={contentSetID}/>,
        <VideoAnimation key={index + 1345} titleText={contentText} index={index + 18} videoCount={videoCount} contentSetID={contentSetID}/>,
    ];
    const randomChild = getRandom(5, index);
    console.log(randomChild)
    return (
        <AbsoluteFill key={`af-content-${index}`}>
            {audioUrl ? <Audio key={`audio-content-${index}`} src={audioUrl} /> : <></>}
            {childs[randomChild-1]}
        </AbsoluteFill>
    );
};
