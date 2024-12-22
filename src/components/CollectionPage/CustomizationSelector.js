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
        customizeTabRefs.current[currentCustomizationIndex]?.clientWidth;
      if (currentCustomizationTransform !== undefined) {
        customizeTabContainer.current.scrollTo({
          left: currentCustomizationTransform * currentCustomizationIndex,
          behavior: "smooth",
        });
      }
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
        <div
          ref={customizeTabContainer}
          className="scrollbar-hide absolute top-0 flex w-screen snap-x snap-mandatory overflow-x-auto px-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out max-w-1023-max-w-736:-translate-y-[40%] max-w-1023-max-w-736:px-[22.5vw]"
        >
          {customizeTabVariants?.variants?.map((item, index) => {
            return (
              <button
                key={index}
                ref={(ref) => (customizeTabRefs.current[index] = ref)}
                onClick={() => {
                  changeCurrentCustomizations(item?.id, "size");
                }}
                className="w-[312px] flex-shrink-0 cursor-pointer snap-center overflow-hidden max-w-1023-max-w-736:w-[55vw]"
                style={{
                  transition:
                    "transform 0.25s ease 0.2s, opacity 0.5s ease 0.2s",
                }}
              >
                <div className="min-w-768-max-w-1024:ms-calc--23vh-156px relative ms-calc--26vh-156px max-w-1023-max-w-736:ms-[-15vw]">
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
                    className="aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw]"
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
                    className="absolute top-0 aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw]"
                  />
                </div>
              </button>
            );
          })}
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
            className="mx-auto aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:w-[85vw]"
            style={{
              transition: "opacity 0.5s ease 0.2s",
            }}
          />
          <div
            ref={customizeTabContainer}
            className="scrollbar-hide absolute top-0 flex w-screen snap-x snap-mandatory overflow-x-auto px-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out max-w-1023-max-w-736:px-[22.5vw]"
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
                        className="w-[312px] flex-shrink-0 cursor-pointer snap-center overflow-hidden max-w-1023-max-w-736:w-[55vw]"
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
                          className="min-w-768-max-w-1024:ms-calc--23vh-156px ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:ms-[-15vw] max-w-1023-max-w-736:w-[85vw]"
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
          <div className="mx-auto w-[312px] cursor-pointer overflow-hidden max-w-1023-max-w-736:w-[55vw]">
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
              className="min-w-768-max-w-1024:ms-calc--23vh-156px relative z-[5] ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:ms-[-15vw] max-w-1023-max-w-736:w-[85vw]"
              style={{
                transition: "opacity 0.5s ease 0.2s",
              }}
            />
          </div>

          <div
            ref={customizeTabContainer}
            className="scrollbar-hide absolute top-0 z-0 flex w-screen snap-x snap-mandatory overflow-x-auto px-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out max-w-1023-max-w-736:px-[22.5vw]"
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
                        className="w-[312px] flex-shrink-0 cursor-pointer snap-center overflow-hidden max-w-1023-max-w-736:w-[55vw]"
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
                          className="min-w-768-max-w-1024:ms-calc--23vh-156px ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:ms-[-15vw] max-w-1023-max-w-736:w-[85vw]"
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
    </div>
  );
}

export default CustomizationSelector;
