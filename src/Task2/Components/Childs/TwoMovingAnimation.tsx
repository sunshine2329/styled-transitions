import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { getRandom } from '../../Utils/utils';

const backSecond: React.CSSProperties = {
	fontWeight: 'bold',
	position: 'absolute',
	height: '100%',
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Yanone',
};
const backFirst: React.CSSProperties = {
	position: 'absolute',
	height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
};

export const TwoMovingAnimation: React.FC<{
	titleText: string;
	index: number;
    imageCount: number;
	contentSetID: string;
}> = ({titleText, index, imageCount, contentSetID}) => {
	const { durationInFrames, fps, width, height } = useVideoConfig();
	const frame = useCurrentFrame();

	const pointX = interpolate(frame, [0, durationInFrames], [0, 200 * width / 1920], {
        extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame, [0, 30 * width / 1920], [0.2, 1], {
        extrapolateRight: "clamp",
    });
    const progressSec = spring({
        fps,
        frame,
        config: {
            damping: 500,
        },
    });
    const topYSec = interpolate(progressSec, [0, 1], [0, 750 * height / 1080]);
    const progressFirst = spring({
        fps,
        frame: frame - 4,
        config: {
            damping: 500,
        },
    });
    const topYFirst = interpolate(progressFirst, [0, 1], [0, 750 * height / 1080]);
    const temp = titleText.replace(/[\s\S]{1,84}(?!\S)/g, '$&\n')
    const wordlines = temp.split('\n');

    return (
        <AbsoluteFill key={`af-moving-${index}`}>
            <Img
                style={{
                    width: `${width * 1.2}px`,
                    position: 'absolute',
                    left: -pointX
                }}
                src={staticFile(`images/${contentSetID}/${getRandom(imageCount, index)}.jpg`)}
            />
            <div style={{
                ...backFirst,
                top: topYFirst
            }} />

            <div style={{
                ...backSecond,
                fontSize: 50 * width / 1920,
                top: topYSec
            }}>
                <div
                    style={{
                        color: '#00000',
                        paddingTop: 20 * (7 - wordlines.length),
                        opacity
                    }}
                >
                    { wordlines.map((t) => {
                                return <div>{t}</div>
                            }
                        )
                    }

                </div>
            </div>
        </AbsoluteFill>
    );
};
