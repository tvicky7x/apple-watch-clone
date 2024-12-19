import {
  getAllWatchDetails,
  getComponentText,
} from "@/utilities/commonFunction";
import React from "react";

function WatchDescriptionText({
  currentCollection,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  const content = getComponentText("collectionPage.watchDescriptionText");
  const {
    watchCollection,
    watchSize,
    watchCase,
    watchCaseVariant,
    watchBandVariant,
  } = getAllWatchDetails({
    currentCollection,
    currentSize,
    currentCase,
    currentCaseVariant,
    currentBand,
    currentBandVariant,
  });
  return (
    <div
      className={`animate-showAnimation1d8s min-h-950:pt-[4vh] pt-calc-2vh-8px absolute left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-y-[12px] text-wrap text-center opacity-0 md:text-nowrap`}
    >
      <span className="cursor-pointer select-none text-[12px] leading-[16px] tracking-[-0.12px] text-primaryButtonColor underline">
        {content?.sideView?.para}
      </span>
      <div className="inline-flex flex-col items-center gap-y-[4px]">
        <p className="text-collectionTextColor text-[12px] font-semibold uppercase leading-[16px] tracking-[-0.12px]">
          {watchCollection?.variantName}
        </p>
        <p className="text-[15px] font-medium leading-[20px] tracking-[-0.22px]">{`${watchSize?.variantName} ${watchCaseVariant?.variantName} ${watchCase?.variantName} with ${watchBandVariant?.variantName}`}</p>
        <p className="text-[14px] leading-[20px] tracking-[-0.22px]">{`${content?.price?.para}492`}</p>
      </div>
    </div>
  );
}

export default WatchDescriptionText;
