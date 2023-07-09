import React from 'react';
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from 'remotion';
import { getRandom, getWordLines } from '../../Utils/utils';

const divWord: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',
    position: 'absolute',
    paddingRight: 60,
    fontFamily: 'Yanone',
}

const wordLine: React.CSSProperties = {
    marginTop: -2,
    fontWeight: 'bold',
	position: 'relative',
    overflow: 'hidden'
}

const firstWordLine: React.CSSProperties = {
    fontWeight: 'bold',
	position: 'absolute',
    right: 0,
    top: 0,
    padding: '0px 15px',
}
const secondWordLine: React.CSSProperties = {
    fontWeight: 'bold',
	position: 'absolute',
    right: 0,
    top: 80,
    padding: '0px 15px',
    zIndex: 100
}
export const VideoAnimation: React.FC<{
	titleText: string;
	index: number;
    videoCount: number;
    contentSetID: string;
}> = ({titleText, index, videoCount, contentSetID}) => {
	const { fps, width, height } = useVideoConfig();
	const frame = useCurrentFrame();
    const wordlines = getWordLines(titleText, 32);
    const firstBackColor = '#1f2025';
    const secondBackColor = "#ffffff";
    const titleColor = "#000000";
    console.log(videoCount, 'video animation')
    return (
        <AbsoluteFill key={`af-video-${index}`}>
            <Video  src={staticFile(`videos/${contentSetID}/${getRandom(videoCount, index + 44)}.mp4`)} style={{ height, width, objectFit: 'cover' }}/>
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
                    const topY = interpolate(progress, [0, 1], [70 * width / 1920, 0]);
                    const delaySec = i * 4;

                    const progressSec = spring({
                        fps,
                        frame: frame - delaySec,
                        config: {
                            damping: 200,
                        },
                    });
                    const topYSec = interpolate(progressSec, [0, 1], [70 * width / 1920, 0]);
                    return (
                        <div style={{
                            ...wordLine,
                            fontSize: 70 * width / 1920,
                            width: 1000 * width / 1920,
                            height: 80 * width / 1920
                        }}>
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
