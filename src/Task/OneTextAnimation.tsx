import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame,  useVideoConfig } from 'remotion';
import Background from '../assets/img.jpg';

const divWord: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
}

const wordLine: React.CSSProperties = {
    fontWeight: 'bold',
	fontSize: 100,
}
export const OneTextAnimation: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const { fps, width, durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();
    const wordlines = titleText.split('\n');
    const translateDivX = interpolate(frame, [0, 25], [-150, 0], {
        extrapolateRight: "clamp",
    });
    const pointX = interpolate(frame, [0, durationInFrames], [0, 80], {
        extrapolateRight: "clamp",
    });
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
            <AbsoluteFill style={{transform: `translateX(${translateDivX}px)`}}>
                <div style={divWord}>
                    {wordlines.map((t, i) => {
                        const delay = i * 10;

                        const opacity = spring({
                            fps,
                            frame: frame - delay,
                            config: {
                                damping: 200,
                                mass: 20,
                            },
                        });
                        
                        const translateX = interpolate(opacity, [0, 1], [-80, 0]);
                        return (
                            <span
                                key={t}
                                style={{
                                    ...wordLine,
                                    color: titleColor,
                                    transform: `translateX(${translateX}px)`,
                                    opacity
                                }}
                            >
                                {t}<br/>
                            </span>
                        );
                    })}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
	);
};
