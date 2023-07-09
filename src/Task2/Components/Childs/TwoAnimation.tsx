import {staticFile} from 'remotion'
import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { getRandom } from '../../Utils/utils';

const leftPart: React.CSSProperties = {
	height: '101%',
    width: '100%',
    zIndex: 100,
    marginLeft: '-1px',
    marginBottom: '-2px',
    fontFamily: 'Yanone',
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
	color: 'white'
}
export const TwoAnimation: React.FC<{
	titleText: string;
	index: number;
    imageCount: number;
	contentSetID: string;
}> = ({titleText, index, imageCount, contentSetID}) => {
	const { fps, durationInFrames, width } = useVideoConfig();
	const frame = useCurrentFrame();

	const backTransform = interpolate(frame, [0, 50], [30, 60], {
        extrapolateRight: "clamp",
    });
    const pointX = interpolate(frame, [0, durationInFrames], [0, 80], {
        extrapolateRight: "clamp",
    });
    const temp = titleText.replace(/[\s\S]{1,21}(?!\S)/g, '$&\n')
    const wordlines = temp.split('\n');
    return (
        <AbsoluteFill key={`af-two-${index}`}>
            <Img
                style={{
                    width: `${width* 1.2}px`,
                    position: 'absolute',
                    left: -pointX
                }}
                src={staticFile(`images/${contentSetID}/${getRandom(imageCount, index)}.jpg`)}
            />
            <div style={{
                ...leftPart,
                background: `radial-gradient(circle at right, #3330, #3330 30%, #eee0 ${backTransform}%, #1f2025 25%)`,
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
                                    fontSize: 70 * width / 1920,
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
