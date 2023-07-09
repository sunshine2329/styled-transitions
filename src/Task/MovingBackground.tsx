import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Img, useVideoConfig } from 'remotion';
import Background from '../assets/img.jpg';

const title: React.CSSProperties = {
	fontWeight: 'bold',
	fontSize: 100,
	textAlign: 'center',
	position: 'absolute',
	width: '100%',
};

const roundedNumber: React.CSSProperties = {
    backgroundColor: 'blue',
    borderRadius: '50%',
    color: 'white',
    fontWeight: 'bold',
	fontSize: 150,
    textAlign: 'center',
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const MovingBackground: React.FC<{
	titleText: string;
	titleColor: string;
    titleNumber: string;
}> = ({titleText, titleColor, titleNumber}) => {
	const {durationInFrames, width, height} = useVideoConfig();
	const frame = useCurrentFrame();

	const pointX = interpolate(frame, [0, durationInFrames], [0, 200], {
        extrapolateRight: "clamp",
    });
    const pointY = interpolate(frame, [0, durationInFrames], [0, 50], {
        extrapolateRight: "clamp",
    });
    const logoTranslation = interpolate(frame, [0, 18], [-20, 150], {
        extrapolateRight: "clamp",
    });
    const txtTranslation = interpolate(frame, [0, 13], [-150, 0], {
        extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });
    return (
        <AbsoluteFill>
            <Img
                style={{
                    width: `${width * 1.2}px`,
                    height: `${height * 1.2}px`,
                    position: 'absolute',
                    top: -pointY,
                    left: -pointX
                }}
                src={Background}
            />
            <h1 style={{
                ...title,
                top: (height - 100)/2
            }}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{
                        ...roundedNumber,
                        transform: 'translateY(-150px)',
                    }}>
                        <span style={{
                            transform: `translateY(${-txtTranslation}px)`,
                            opacity
                        }}>
                            {titleNumber}
                        </span>
                    </div>
                    <div
                        style={{
                            color: titleColor,
                            paddingLeft: 30,
                            transform: `translateY(${-logoTranslation}px)`,
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
