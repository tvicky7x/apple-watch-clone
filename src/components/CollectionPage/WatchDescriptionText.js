import {
  getAllWatchDetails,
  getComponentText,
} from "@/utilities/commonFunction";
import React from "react";

function WatchDescriptionText({
  sideViewHandler,
  sideViewActive,
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
      className={`absolute left-1/2 inline-flex w-max max-w-[100vw] -translate-x-1/2 animate-showAnimation1d8s flex-col items-center gap-y-[12px] pt-calc-2vh-8px text-center opacity-0 min-h-950:pt-[4vh]`}
    >
      <span
        onClick={sideViewHandler}
        className="cursor-pointer select-none text-[12px] leading-[16px] tracking-[-0.12px] text-primaryButtonColor underline"
      >
        {sideViewActive
          ? content?.sideView?.active
          : content?.sideView?.inActive}
      </span>
      <div className="inline-flex flex-col items-center gap-y-[4px]">
        <p className="text-[12px] font-semibold uppercase leading-[16px] tracking-[-0.12px] text-collectionTextColor">
          {watchCollection?.variantName}
        </p>
        <p className="text-[15px] font-medium leading-[20px] tracking-[-0.22px]">{`${watchSize?.variantName} ${watchCaseVariant?.variantName} ${watchCase?.variantName} with ${watchBandVariant?.variantName}`}</p>
        <p className="text-[14px] leading-[20px] tracking-[-0.22px]">{`${content?.price?.para}492`}</p>
      </div>
    </div>
  );
}

export default WatchDescriptionText;
