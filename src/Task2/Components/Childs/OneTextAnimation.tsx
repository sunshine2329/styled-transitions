import {staticFile} from 'remotion'
import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame,  useVideoConfig } from 'remotion';
import { getRandom } from '../../Utils/utils';

const divWord: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Yanone',
}

const wordLine: React.CSSProperties = {
    fontWeight: 'bold',
	color: '#ffffff',
}

export const OneTextAnimation: React.FC<{
	titleText: string;
	index: number;
    imageCount: number;
    contentSetID: string;
}> = ({titleText, index, imageCount, contentSetID}) => {
	const { fps, width, durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();
    const temp = titleText.replace(/[\s\S]{1,50}(?!\S)/g, '$&\n')
    const wordlines = temp.split('\n');
    const translateDivX = interpolate(frame, [0, 25], [-150 * width / 1920, 0], {
        extrapolateRight: "clamp",
    });
    const pointX = interpolate(frame, [0, durationInFrames], [0, 80 * width / 1920], {
        extrapolateRight: "clamp",
    });
    return (
        <AbsoluteFill key={`af-one-${index}`}>
            <Img
                style={{
                    width: `${width * 1.2}px`,
                    position: 'absolute',
                    left: -pointX
                }}
                src={staticFile(`images/${contentSetID}/${getRandom(imageCount, index)}.jpg`)}
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

                        const translateX = interpolate(opacity, [0, 1], [-80 * width / 1920, 0]);
                        return (
                            <span
                                key={t}
                                style={{
                                    ...wordLine,
                                    fontSize: 80 * width / 1920,
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
