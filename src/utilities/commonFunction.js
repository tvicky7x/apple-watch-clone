import EN_JSON from "./EN.json";
import customizeWatchJson from "./customizeWatchJson.json";

// get component text
export function getComponentText(path) {
  const pathArray = path.split(".");
  let answer = EN_JSON[pathArray[0]];
  for (let i = 1; i <= pathArray.length - 1; i++) {
    answer = answer[pathArray[i]];
  }
  return answer;
}

// Image prefix handler
export function imagePrefixHandler(imageUrl, prefix) {
  return `${prefix}${imageUrl}`;
}

// watch image imports
export function watchBandImageUrl({
  currentSize,
  currentBand,
  currentBandVariant,
}) {
  return `/jpeg/watch-band/watch-band-${currentSize}-${currentBand}-${currentBandVariant}.jpeg`;
}

export function watchCaseImageUrl({
  currentSize,
  currentCase,
  currentCaseVariant,
}) {
  return `/png/watch-case/watch-case-${currentSize}-${currentCase}-${currentCaseVariant}.png`;
}

export function watchSideViewImageUrl({
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  return `/jpeg/watch-sideView/watch-sideView-${currentSize}-${currentCase}-${currentCaseVariant}-${currentBand}-${currentBandVariant}.jpeg`;
}

// Getting Current Watch details
export function getAllWatchDetails({
  currentCollection,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  const watchCollection = customizeWatchJson.find(
    (item) => item.id === currentCollection,
  );
  const watchSize = watchCollection?.variants
    ?.find((item) => item?.id === "size")
    ?.variants?.find((item) => item?.id === currentSize);

  const watchCase = watchCollection?.variants
    ?.find((item) => item.id === "case")
    ?.variants?.find((item) => item?.id === currentCase);
  const watchBand = watchCollection?.variants
    ?.find((item) => item.id === "band")
    ?.variants?.find((item) => item?.id === currentBand);
  const watchCaseVariant = watchCase?.variants?.find(
    (item) => item.id === currentCaseVariant,
  );
  const watchBandVariant = watchBand?.variants?.find(
    (item) => item.id === currentBandVariant,
  );
  return {
    watchCollection,
    watchSize,
    watchCase,
    watchCaseVariant,
    watchBand,
    watchBandVariant,
  };
}
