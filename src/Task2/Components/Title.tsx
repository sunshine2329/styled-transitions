import React from 'react';
import { staticFile } from 'remotion';
import { Audio, AbsoluteFill, interpolate, useCurrentFrame, Img, useVideoConfig } from 'remotion';
import { getRandom } from '../Utils/utils';

const title: React.CSSProperties = {
	fontWeight: 'bold',
	textAlign: 'center',
	position: 'absolute',
	width: '100%',
    fontFamily: 'Yanone',
    color: 'white',
};

const roundedNumber: React.CSSProperties = {
    backgroundColor: '#1f2025',
    borderRadius: '50%',
    color: 'white',
    fontWeight: 'bold',
	textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const Title: React.FC<{
	titleText: string;
    orderIndex: number;
	index: number;
    audioUrl: string;
    imageCount: number;
	contentSetID: string;
}> = ({titleText, orderIndex, index, audioUrl, imageCount, contentSetID}) => {

    const {durationInFrames, width, height} = useVideoConfig();
    const frame = useCurrentFrame();
    const pointX = interpolate(frame, [0, durationInFrames], [0, 200], {
        extrapolateRight: "clamp",
    });
    const pointY = interpolate(frame, [0, durationInFrames], [0, 50], {
        extrapolateRight: "clamp",
    });
    const txtTranslation = interpolate(frame, [0, 18], [-20, 150], {
        extrapolateRight: "clamp",
    });
    const roundNumberTranslation = interpolate(frame, [0, 13], [-150, 0], {
        extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });
    return (
        <AbsoluteFill key={`af-title-${index}`}>
            {audioUrl ? <Audio key={`audio-title-${index}`} src={audioUrl} /> : <></>}
            <Img
                style={{
                    width: `${width * 1.2}px`,
                    height: `${height * 1.2}px`,
                    position: 'absolute',
                    top: -pointY,
                    left: -pointX
                }}
                src={staticFile(`images/${contentSetID}/${getRandom(imageCount, index + 33)}.jpg`)}
            />
            <h1 style={{
                ...title,
                fontSize: 100 * width/1920,
                top: (height - 100 * width/1920)/2
            }}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{
                        ...roundedNumber,
                        fontSize: 150 * width/1920,
                        width: 200 * width/1920,
                        height: 200 * width/1920,
                        transform: 'translateY(-150px)',
                    }}>
                        <span style={{
                            transform: `translateY(${-roundNumberTranslation}px)`,
                            opacity
                        }}>
                            {orderIndex + 1}
                        </span>
                    </div>
                    <div
                        style={{
                            paddingLeft: 30,
                            transform: `translateY(${-txtTranslation}px)`,
                            width: width-400,
                            opacity
                        }}
                    >
                        {titleText}
                    </div>
                </div>
            </h1>
        </AbsoluteFill>
    );
};
