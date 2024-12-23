"use client";
import {
  getAllWatchDetails,
  getComponentText,
  watchBandImageUrl,
  watchCaseImageUrl,
  watchSideViewImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function SavePage() {
  const content = getComponentText("collectionPage.watchDescriptionText");
  const [sideViewActive, setSideViewActive] = useState(false);
  const searchParams = useSearchParams();

  const currentCollection = searchParams.get("collection");
  const currentSize = searchParams.get("size");
  const currentCase = searchParams.get("case");
  const currentCaseVariant = searchParams.get("caseVariant");
  const currentBand = searchParams.get("band");
  const currentBandVariant = searchParams.get("bandVariant");

  const {
    watchCollection,
    watchSize,
    watchCase,
    watchCaseVariant,
    watchBand,
    watchBandVariant,
  } = getAllWatchDetails({
    currentCollection,
    currentSize,
    currentCase,
    currentCaseVariant,
    currentBand,
    currentBandVariant,
  });

  // Activate side view
  function sideViewHandler() {
    setSideViewActive(!sideViewActive);
  }

  //   back button
  function backButtonHandler() {
    history.back();
  }

  return (
    <div className="relative h-screen w-screen">
      <div>
        <button
          onClick={backButtonHandler}
          className={`absolute left-[18px] top-[24px] animate-showAnimation1d8s rounded-full bg-primaryButtonColor px-[16px] py-[9px] text-[13.67px] leading-[18px] tracking-[-0.22px] text-white opacity-0 hover:bg-primaryButtonColor/[0.97] max-w-1023-max-w-736:top-[48px]`}
        >
          Back
        </button>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
          <div>
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
        <div>
          <div className="inline-flex w-full flex-col items-center gap-y-[12px] px-[5px] text-center">
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
              <p className="text-[14px] leading-[20px] tracking-[-0.22px]">{`${content?.price?.para}${Number(watchSize?.price + watchCaseVariant?.price + watchBandVariant?.price).toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavePage;
