"use client";
import {
  watchBandImageUrl,
  watchCaseImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

function CustomizationSelector({
  customizeTabVariants,
  changeCurrentCustomizations,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  const customizeTabRefs = useRef([]);
  const customizeTabContainer = useRef();

  // Flatten the customizeTabVariants array
  const customizeTabVariantsArray = [];

  if (customizeTabVariants?.id === "size") {
    customizeTabVariants?.variants?.forEach((item) =>
      customizeTabVariantsArray.push({
        ...item,
        parentVariantId: "size",
      }),
    );
  } else {
    customizeTabVariants?.variants?.forEach((item) =>
      item?.variants?.forEach((element) =>
        customizeTabVariantsArray.push({
          ...element,
          parentVariantId: item?.id,
        }),
      ),
    );
  }

  let incrementalIndex = 0;

  useEffect(() => {
    if (customizeTabContainer.current) {
      let currentCustomizationIndex = customizeTabVariantsArray.findIndex(
        (item) => {
          return (
            (item.id === currentSize ||
              item.id === currentCaseVariant ||
              item.id === currentBandVariant) &&
            (item.parentVariantId === "size" ||
              item.parentVariantId === currentCase ||
              item.parentVariantId === currentBand)
          );
        },
      );
      const currentCustomizationTransform =
        customizeTabRefs.current[currentCustomizationIndex].clientWidth;
      customizeTabContainer.current.style.transform = `translateX(-${currentCustomizationTransform * currentCustomizationIndex}px)`;
    }
  }, [
    customizeTabVariants,
    currentSize,
    currentCase,
    currentCaseVariant,
    currentBand,
    currentBandVariant,
  ]);

  return (
    <div>
      {customizeTabVariants?.id === "size" && (
        <div>
          <div
            ref={customizeTabContainer}
            className="absolute top-0 flex ps-calc-50vw-156px"
          >
            {customizeTabVariants?.variants?.map((item, index) => {
              return (
                <button
                  key={index}
                  ref={(ref) => (customizeTabRefs.current[index] = ref)}
                  onClick={() => {
                    changeCurrentCustomizations(item?.id, "size");
                  }}
                  className="w-[312px] cursor-pointer overflow-hidden"
                >
                  <Image
                    src={watchBandImageUrl({
                      currentSize: item?.id,
                      currentBand,
                      currentBandVariant,
                    })}
                    alt={`watch-band-${currentSize}-${currentBand}-${currentBandVariant}`}
                    width={1000}
                    height={1000}
                    loading="lazy"
                    className="ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh]"
                  />
                  <Image
                    src={watchCaseImageUrl({
                      currentSize: item?.id,
                      currentCase,
                      currentCaseVariant,
                    })}
                    alt={`watch-case-${currentSize}-${currentCase}-${currentCaseVariant}`}
                    width={1000}
                    height={1000}
                    priority={true}
                    className="absolute top-0 ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
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
            className="mx-auto aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh]"
          />
          <div
            ref={customizeTabContainer}
            className="absolute top-0 flex ps-calc-50vw-156px"
          >
            {customizeTabVariants?.variants?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.variants?.map((element, innerIndex, array) => {
                    const currentIncrementIndex =
                      incrementalIndex + innerIndex + 1;
                    if (innerIndex === array.length - 1) {
                      incrementalIndex = currentIncrementIndex;
                    }
                    return (
                      <button
                        key={innerIndex}
                        ref={(ref) =>
                          (customizeTabRefs.current[currentIncrementIndex - 1] =
                            ref)
                        }
                        onClick={() => {
                          changeCurrentCustomizations(item?.id, "case");
                          changeCurrentCustomizations(
                            element?.id,
                            item?.changeId,
                          );
                        }}
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
                          className="ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh]"
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
          <div
            ref={customizeTabContainer}
            className="absolute top-0 flex ps-calc-50vw-156px"
          >
            {customizeTabVariants?.variants?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.variants?.map((element, innerIndex, array) => {
                    const currentIncrementIndex =
                      incrementalIndex + innerIndex + 1;
                    if (innerIndex === array.length - 1) {
                      incrementalIndex = currentIncrementIndex;
                    }
                    return (
                      <button
                        key={innerIndex}
                        ref={(ref) =>
                          (customizeTabRefs.current[currentIncrementIndex - 1] =
                            ref)
                        }
                        onClick={() => {
                          changeCurrentCustomizations(item?.id, "band");
                          changeCurrentCustomizations(
                            element?.id,
                            item?.changeId,
                          );
                        }}
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
                          className="ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh]"
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
            className="relative z-[5] mx-auto aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh]"
          />
        </div>
      )}
    </div>
  );
}

export default CustomizationSelector;
