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
  sideViewHandler,
  sideViewActive,
  currentSize,
  currentCase,
  currentCaseVariant,
  currentBand,
  currentBandVariant,
}) {
  const customizeTabRefs = useRef([]);
  const customizeTabContainer = useRef();
  const customizeStaticContainerRef = useRef();

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

  // Find currentCustomizationIndex
  function findCurrentCustomizationIndex() {
    return customizeTabVariantsArray.findIndex((item) => {
      return (
        (item.id === currentSize ||
          item.id === currentCaseVariant ||
          item.id === currentBandVariant) &&
        (item.parentVariantId === "size" ||
          item.parentVariantId === currentCase ||
          item.parentVariantId === currentBand)
      );
    });
  }

  useEffect(() => {
    if (customizeTabContainer.current) {
      let currentCustomizationIndex = findCurrentCustomizationIndex();
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

  useEffect(() => {
    if (customizeTabContainer.current) {
      let currentCustomizationIndex = findCurrentCustomizationIndex();
      if (sideViewActive) {
        if (customizeStaticContainerRef.current) {
          customizeStaticContainerRef.current.style.opacity = 0;
        }
        customizeTabRefs.current.map((element, index) => {
          if (element) {
            if (index !== currentCustomizationIndex) {
              element.style.transform = `translateX(${Math.sign(index - currentCustomizationIndex) * 160}px)`;
            } else {
              element.style.opacity = 0;
            }
          }
        });
      } else {
        if (customizeStaticContainerRef.current) {
          customizeStaticContainerRef.current.style.opacity = 1;
        }
        customizeTabRefs.current.map((element) => {
          if (element) {
            element.style.transform = `none`;
            element.style.opacity = 1;
          }
        });
      }
    }
  }, [sideViewActive]);

  return (
    <div className="select-none">
      {customizeTabVariants?.id === "size" && (
        <div>
          <div
            ref={customizeTabContainer}
            className="absolute top-0 flex ps-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out"
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
                  style={{
                    transition:
                      "transform 0.25s ease 0.2s, opacity 0.5s ease 0.2s",
                  }}
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
            ref={customizeStaticContainerRef}
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
            style={{
              transition: "opacity 0.5s ease 0.2s",
            }}
          />
          <div
            ref={customizeTabContainer}
            className="absolute top-0 flex ps-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out"
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
                        style={{
                          transition:
                            "transform 0.25s ease 0.2s, opacity 0.5s ease 0.2s",
                        }}
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
            className="absolute top-0 flex ps-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out"
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
                          sideViewHandler();
                          changeCurrentCustomizations(item?.id, "band");
                          changeCurrentCustomizations(
                            element?.id,
                            item?.changeId,
                          );
                        }}
                        className="w-[312px] cursor-pointer overflow-hidden"
                        style={{
                          transition:
                            "transform 0.25s ease 0.2s, opacity 0.5s ease 0.2s",
                        }}
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
            ref={customizeStaticContainerRef}
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
            style={{
              transition: "opacity 0.5s ease 0.2s",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CustomizationSelector;
