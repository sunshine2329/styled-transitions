import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import Background from '../assets/img.jpg';

const backSecond: React.CSSProperties = {
	fontWeight: 'bold',
	fontSize: 100,
    position: 'absolute',
	height: '100%',
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center'
};
const backFirst: React.CSSProperties = {
	position: 'absolute',
	height: '100%',
    width: '100%',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center'
};

export const TwoMovingAnimation: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const { durationInFrames, fps, width } = useVideoConfig();
	const frame = useCurrentFrame();

	const pointX = interpolate(frame, [0, durationInFrames], [0, 200], {
        extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame, [0, 30], [0.2, 1], {
        extrapolateRight: "clamp",
    });
    const progressSec = spring({
        fps,
        frame,
        config: {
            damping: 500,
        },
    });
    const topYSec = interpolate(progressSec, [0, 1], [0, 800]);
    const progressFirst = spring({
        fps,
        frame: frame - 4,
        config: {
            damping: 500,
        },
    });
    const topYFirst = interpolate(progressFirst, [0, 1], [0, 800]);
    return (
        <AbsoluteFill>
            <Img
                style={{
                    width: `${width * 1.2}px`,
                    position: 'absolute',
                    left: -pointX
                }}
                src={Background}
            />
            <div style={{
                ...backFirst,
                top: topYFirst
            }} />
            
            <div style={{
                ...backSecond,
                top: topYSec
            }}>
                <div
                    style={{
                        color: titleColor,
                        paddingTop: 80,
                        opacity
                    }}
                >
                    {titleText}    
                </div>
            </div>
        </AbsoluteFill>
    );
};
