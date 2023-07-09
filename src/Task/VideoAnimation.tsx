import React from 'react';
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from 'remotion';

const divWord: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',
    position: 'absolute',
    paddingRight: 60
}

const wordLine: React.CSSProperties = {
    marginTop: -2,
    fontWeight: 'bold',
	fontSize: 70,
    width: 900,
    position: 'relative',
    height: 80,
    overflow: 'hidden'
}

const firstWordLine: React.CSSProperties = {
    fontWeight: 'bold',
	fontSize: 70,
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '0px 15px',
}
const secondWordLine: React.CSSProperties = {
    fontWeight: 'bold',
	fontSize: 70,
    position: 'absolute',
    right: 0,
    top: 80,
    padding: '0px 15px',
    zIndex: 100
}
export const VideoAnimation: React.FC<{
	titleText: string;
	titleColor: string;
    firstBackColor: string;
    secondBackColor: string;
}> = ({titleText, titleColor, firstBackColor, secondBackColor}) => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();
    const wordlines = titleText.split('\n');
    return (
        <AbsoluteFill>
            <Video src={staticFile("videos/1.mp4")} />
            <div style={divWord}>
                {wordlines.map((t, i) => {
                    const delay = i * 5;
                    const progress = spring({
                        fps,
                        frame: frame - delay,
                        config: {
                            damping: 200,
                        },
                    });
                    const topY = interpolate(progress, [0, 1], [80, 0]);
                    const delaySec = i * 4;

                    const progressSec = spring({
                        fps,
                        frame: frame - delaySec,
                        config: {
                            damping: 200,
                        },
                    });
                    const topYSec = interpolate(progressSec, [0, 1], [80, 0]);
                    return (
                        <div style={wordLine}>
                            <div
                                key={t.trim()}
                                style={{
                                    ...firstWordLine,
                                    color: firstBackColor,
                                    backgroundColor: firstBackColor,
                                    top: `${topYSec}px`,
                                }}
                            >{t.trim()}
                            </div>
                            <div style={{
                                ...secondWordLine,
                                top: `${topY}px`,
                                color: titleColor,
                                backgroundColor: secondBackColor
                            }}>{t.trim()}</div>
                        </div>

                    );
                })}

            </div>
        </AbsoluteFill>
	);
};
