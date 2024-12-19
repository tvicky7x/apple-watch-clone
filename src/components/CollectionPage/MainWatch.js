import {
  imagePrefixHandler,
  watchBandImageUrl,
  watchCaseImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";

function MainWatch({
  customizeActive,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  return (
    <div
      className={`${!customizeActive ? "top-[33.75rem] scale-[2]" : "top-0 scale-[1]"} absolute left-1/2 -translate-x-1/2 transition-all delay-[0.4s] duration-[1.2s] ease-in`}
    >
      <div className="animate-showAnimation opacity-0">
        <Image
          src={watchBandImageUrl(currentSize, currentBand, currentBandVariant)}
          alt="main-watch-band"
          width={1000}
          height={1000}
          priority={true}
          className="aspect-auto w-[52vh] max-w-[500px]"
        />
        <Image
          src={watchCaseImageUrl(currentSize, currentCase, currentCaseVariant)}
          alt="main-watch-case"
          width={1000}
          height={1000}
          priority={true}
          className="absolute top-0 aspect-auto w-[52vh] max-w-[500px]"
        />
      </div>
    </div>
  );
}

export default MainWatch;
