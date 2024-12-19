import EN_JSON from "./EN.json";

// get component text
export function getComponentText(path) {
  const pathArray = path.split(".");
  let answer = EN_JSON[pathArray[0]];
  for (let i = 1; i < pathArray.length - 1; i++) {
    answer = answer[pathArray[i]];
  }
  return answer;
}

// Image prefix handler
export function imagePrefixHandler(imageUrl, prefix) {
  return `${prefix}${imageUrl}`;
}

// watch image imports
export function watchBandImageUrl(
  currentSize,
  currentBand,
  currentBandVariant,
) {
  return `/jpeg/watch-band/watch-band-${currentSize}-${currentBand}-${currentBandVariant}.jpeg`;
}

export function watchCaseImageUrl(
  currentSize,
  currentCase,
  currentCaseVariant,
) {
  return `/png/watch-case/watch-case-${currentSize}-${currentCase}-${currentCaseVariant}.png`;
}
