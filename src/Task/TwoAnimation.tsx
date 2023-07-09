import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import Background from '../assets/img.jpg';

const leftPart: React.CSSProperties = {
	height: '101%',
    width: '100%',
    zIndex: 100,
    marginLeft: '-1px',
    marginBottom: '-2px'
};
const divWord: React.CSSProperties = {
    paddingLeft: 60,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center'
}

const wordLine: React.CSSProperties = {
    fontWeight: 'bold',
	fontSize: 70,
}
export const TwoAnimation: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const { fps, durationInFrames, width } = useVideoConfig();
	const frame = useCurrentFrame();

	const backTransform = interpolate(frame, [0, 50], [30, 60], {
        extrapolateRight: "clamp",
    });
    const pointX = interpolate(frame, [0, durationInFrames], [0, 80], {
        extrapolateRight: "clamp",
    });
    const wordlines = titleText.split('\n');
    return (
        <AbsoluteFill>
            <Img
                style={{
                    width: `${width* 1.2}px`,
                    position: 'absolute',
                    left: -pointX
                }}
                src={Background}
            />
            <div style={{
                ...leftPart,
                background: `radial-gradient(circle at right, #3330, #3330 30%, #eee0 ${backTransform}%, #192335 25%)`,
            }}>
                <div style={divWord}>
                    {wordlines.map((t, i) => {
                        const delay = i * 5;

                        const opacity = spring({
                            fps,
                            frame: frame - delay,
                            config: {
                                damping: 200,
                            },
                        });

                        return (
                            <span
                                key={t}
                                style={{
                                    ...wordLine,
                                    color: titleColor,
                                    opacity: `${opacity}`,
                                }}
                            >
                                {t}<br/>
                            </span>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
	);
};
