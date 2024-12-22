import {
  imagePrefixHandler,
  watchBandImageUrl,
  watchCaseImageUrl,
  watchSideViewImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";
import WatchDescriptionText from "./WatchDescriptionText";
import CustomizationSelector from "./CustomizationSelector";

function MainWatch({
  customizeActive,
  customizeTabActive,
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
      className={`${!customizeActive ? "min-w-768-max-w-1024-noLandscape:top-[175%] top-[33.75rem] scale-[2] max-w-1023-max-w-736:top-[420px] max-w-1023-max-w-736:scale-[1.7]" : "top-0 scale-[1] max-w-1023-max-w-736:top-[40%] max-w-1023-max-w-736:-translate-y-[40%]"} absolute left-1/2 -translate-x-1/2 transition-all delay-[0.4s] duration-[1.1s] ease-in`}
    >
      <div className="aspect-square w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw] max-w-1023-max-w-736:max-w-none">
        <div
          className={`${customizeTabActive && !sideViewActive ? "animate-hideAnimation" : "animate-showAnimation opacity-0"} select-none`}
        >
          <div className="relative min-h-[19.188rem]">
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
                className="aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw] max-w-1023-max-w-736:max-w-none"
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
                className="absolute top-0 aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw] max-w-1023-max-w-736:max-w-none"
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
              className={`${!sideViewActive ? "animate-spinHideAnimation" : "animate-spinShowAnimation opacity-0"} absolute top-0 aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw] max-w-1023-max-w-736:max-w-none`}
            />
          </div>
        </div>
      </div>

      {customizeActive && (
        <WatchDescriptionText
          sideViewHandler={sideViewHandler}
          sideViewActive={sideViewActive}
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
