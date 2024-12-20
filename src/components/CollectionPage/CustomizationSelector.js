"use client";
import {
  watchBandImageUrl,
  watchCaseImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";

function CustomizationSelector({
  customizeTabVariants,
  currentCollection,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  return (
    <div>
      {customizeTabVariants?.id === "case" && (
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
            loading="lazy"
            className="min-w-768-max-w-1024:w-[46vh] mx-auto aspect-auto w-[52vh] max-w-[500px]"
          />
          <div className="ps-calc-50vw-156px absolute top-0 flex">
            {customizeTabVariants?.variants?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.variants?.map((element, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => console.log(index, item.id)}
                        className="w-[312px] cursor-pointer overflow-hidden"
                      >
                        <Image
                          src={watchCaseImageUrl({
                            currentSize,
                            currentCase: item?.id,
                            currentCaseVariant: element?.id,
                          })}
                          alt={`watch-case-${currentSize}-${currentCase}-${currentCaseVariant}`}
                          width={1000}
                          height={1000}
                          priority={true}
                          className="min-w-768-max-w-1024:w-[46vh] ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px]"
                        />
                      </button>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
      {customizeTabVariants?.id === "band" && (
        <div>
          <div className="ps-calc-50vw-156px absolute top-0 flex">
            {customizeTabVariants?.variants?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.variants?.map((element, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => console.log(index, item.id)}
                        className="w-[312px] cursor-pointer overflow-hidden"
                      >
                        <Image
                          src={watchBandImageUrl({
                            currentSize,
                            currentBand: item?.id,
                            currentBandVariant: element?.id,
                          })}
                          alt={`watch-band-${currentSize}-${currentBand}-${currentBandVariant}`}
                          width={1000}
                          height={1000}
                          loading="lazy"
                          className="min-w-768-max-w-1024:w-[46vh] ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px]"
                        />
                      </button>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
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
            className="min-w-768-max-w-1024:w-[46vh] relative z-[5] mx-auto aspect-auto w-[52vh] max-w-[500px]"
          />
        </div>
      )}
    </div>
  );
}

export default CustomizationSelector;
