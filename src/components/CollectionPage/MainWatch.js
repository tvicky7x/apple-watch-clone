import {
  imagePrefixHandler,
  watchBandImageUrl,
  watchCaseImageUrl,
  watchSideViewImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";
import WatchDescriptionText from "./WatchDescriptionText";

function MainWatch({
  customizeActive,
  sideViewActive,
  sideViewHandler,
  currentCollection,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  return (
    <div
      className={`${!customizeActive ? "top-[33.75rem] scale-[2]" : "top-0 scale-[1]"} absolute left-1/2 -translate-x-1/2 transition-all delay-[0.4s] duration-[1.1s] ease-in`}
    >
      <div className="animate-showAnimation select-none opacity-0">
        <div
          className={`${sideViewActive ? "animate-spinHideAnimation" : "animate-spinShowAnimation opacity-0"} `}
        >
          <Image
            src={watchBandImageUrl({
              currentSize,
              currentBand,
              currentBandVariant,
            })}
            alt={`watch-band-${currentSize}-${currentBand}-${currentBandVariant}`}
            width={1000}
            height={1000}
            priority={true}
            className="min-w-768-max-w-1024:w-[46vh] aspect-auto w-[52vh] max-w-[500px]"
          />
          <Image
            src={watchCaseImageUrl({
              currentSize,
              currentCase,
              currentCaseVariant,
            })}
            alt={`watch-case-${currentSize}-${currentCase}-${currentCaseVariant}`}
            width={1000}
            height={1000}
            priority={true}
            className="min-w-768-max-w-1024:w-[46vh] absolute top-0 aspect-auto w-[52vh] max-w-[500px]"
          />
        </div>
        <Image
          src={watchSideViewImageUrl({
            currentSize,
            currentCase,
            currentCaseVariant,
            currentBand,
            currentBandVariant,
          })}
          alt={`watch-sideView-${currentSize}-${currentCase}-${currentCaseVariant}-${currentBand}-${currentBandVariant}`}
          width={1000}
          height={1000}
          priority={true}
          className={`${!sideViewActive ? "animate-spinHideAnimation" : "animate-spinShowAnimation opacity-0"} min-w-768-max-w-1024:w-[46vh] absolute top-0 aspect-auto w-[52vh] max-w-[500px]`}
        />
      </div>
      {customizeActive && (
        <WatchDescriptionText
          sideViewHandler={sideViewHandler}
          currentCollection={currentCollection}
          currentSize={currentSize}
          currentCase={currentCase}
          currentCaseVariant={currentCaseVariant}
          currentBand={currentBand}
          currentBandVariant={currentBandVariant}
        />
      )}
    </div>
  );
}

export default MainWatch;
