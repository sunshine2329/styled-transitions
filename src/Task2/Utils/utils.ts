import { random } from "remotion";

export const getRandom = (max: number, seed: number | null) => {
  return Math.floor(random(seed) * (max - 1) + 1 )
}

export const getWordLines = (titleText: string, lineCharCount: number) => {
  const regex = new RegExp(`[\\s\\S]{1,${lineCharCount}}(?!\\S)`, 'g');
  const temp = titleText.replace(regex, '$&\n')
  let wordlines = temp.split('\n');
  wordlines = wordlines.filter(x => x.length > 0);
  wordlines = wordlines.map((x) => x.trim());
  return wordlines;
}