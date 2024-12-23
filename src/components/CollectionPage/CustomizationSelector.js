"use client";
import {
  imagePrefixHandler,
  watchBandImageUrl,
  watchCaseImageUrl,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

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
  const [isSwiping, setIsSwiping] = useState(false);
  const [isContainerSet, setIsContainerSet] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0); // Define startTime as a useRef
  const threshold = 10; // Minimum distance to consider as dragging
  const timeThreshold = 100; // Minimum time in ms to consider as dragging

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

  // arrow Increment
  function arrowIncrement(index) {
    if (customizeTabVariants?.id === "size") {
      changeCurrentCustomizations(customizeTabVariantsArray[index]?.id, "size");
    } else if (customizeTabVariants?.id === "band") {
      changeCurrentCustomizations(
        customizeTabVariantsArray[index]?.parentVariantId,
        "band",
      );
      changeCurrentCustomizations(
        customizeTabVariantsArray[index]?.id,
        "bandVariant",
      );
    } else if (customizeTabVariants?.id === "case") {
      changeCurrentCustomizations(
        customizeTabVariantsArray[index]?.parentVariantId,
        "case",
      );
      changeCurrentCustomizations(
        customizeTabVariantsArray[index]?.id,
        "caseVariant",
      );
    }
  }

  const handleCustomizationChange = () => {
    const container = customizeTabContainer.current;
    if (container) {
      const children = container.children;
      const viewportCenter = window.innerWidth / 2;
      let closestElement = null;
      let closestDistance = Infinity;
      let closestIndex = -1;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(viewportCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = child;
          closestIndex = i;
        }
      }

      if (closestElement && closestIndex !== -1) {
        // console.log("Middle element:", closestElement);

        if (customizeTabVariants?.id === "size") {
          changeCurrentCustomizations(
            customizeTabVariantsArray[closestIndex]?.id,
            "size",
          );
        } else if (customizeTabVariants?.id === "band") {
          changeCurrentCustomizations(
            customizeTabVariantsArray[closestIndex]?.parentVariantId,
            "band",
          );
          changeCurrentCustomizations(
            customizeTabVariantsArray[closestIndex]?.id,
            "bandVariant",
          );
        } else if (customizeTabVariants?.id === "case") {
          changeCurrentCustomizations(
            customizeTabVariantsArray[closestIndex]?.parentVariantId,
            "case",
          );
          changeCurrentCustomizations(
            customizeTabVariantsArray[closestIndex]?.id,
            "caseVariant",
          );
        }
      }
    }
  };

  useEffect(() => {
    if (customizeTabContainer.current) {
      setIsContainerSet(false);
      let currentCustomizationIndex = findCurrentCustomizationIndex();
      const currentCustomizationTransform =
        customizeTabRefs.current[currentCustomizationIndex]?.clientWidth;
      if (currentCustomizationTransform !== undefined) {
        customizeTabContainer.current.scrollTo({
          left: currentCustomizationTransform * currentCustomizationIndex,
          behavior: "smooth",
        });
        setTimeout(() => {
          setIsContainerSet(true);
        }, 700); // Delay of 0.7 seconds
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

  useEffect(() => {
    const handleTouchStart = (e) => {
      isDragging.current = false;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      startTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
      const deltaX = Math.abs(e.touches[0].clientX - startX.current);
      const deltaY = Math.abs(e.touches[0].clientY - startY.current);
      if (deltaX > threshold || deltaY > threshold) {
        isDragging.current = true;
        setIsSwiping(true);
      }
    };

    const handleTouchEnd = () => {
      const touchDuration = Date.now() - startTime.current;
      if (isDragging.current && touchDuration > timeThreshold) {
        setIsSwiping(false);
      }
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(handleScroll.timeout);
      handleScroll.timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100); // Delay to determine end of scrolling
    };

    const container = customizeTabContainer.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [customizeTabVariants]);

  useEffect(() => {
    if (!isSwiping && isContainerSet && !isScrolling) {
      handleCustomizationChange();
    }
  }, [isSwiping, isContainerSet, isScrolling]);

  return (
    <>
      {findCurrentCustomizationIndex() !== 0 && (
        <div
          onClick={() => arrowIncrement(findCurrentCustomizationIndex() - 1)}
          className="absolute left-[16px] top-1/2 z-[99] flex aspect-square w-[36px] -translate-y-1/2 select-none items-center justify-center rounded-full bg-customizeTabBg max-w-1023-max-w-736:hidden"
        >
          <Image
            src={imagePrefixHandler("/arrow-right.svg", "/svg")}
            alt="arrow left"
            width={10}
            height={17}
            className="aspect-auto w-[10px] rotate-180"
          />
        </div>
      )}

      {findCurrentCustomizationIndex() !==
        customizeTabVariantsArray.length - 1 && (
        <div
          onClick={() => arrowIncrement(findCurrentCustomizationIndex() + 1)}
          className="absolute right-[16px] top-1/2 z-[99] flex aspect-square w-[36px] -translate-y-1/2 select-none items-center justify-center rounded-full bg-customizeTabBg max-w-1023-max-w-736:hidden"
        >
          <Image
            src={imagePrefixHandler("/arrow-right.svg", "/svg")}
            alt="arrow left"
            width={10}
            height={17}
            className="aspect-auto w-[10px]"
          />
        </div>
      )}

      <div className="select-none">
        {customizeTabVariants?.id === "size" && (
          <div
            ref={customizeTabContainer}
            className="scrollbar-hide top-0 flex w-screen snap-x snap-mandatory overflow-x-auto px-calc-50vw-156px transition-transform duration-[0.5s] ease-in-out max-w-1023-max-w-736:px-[22.5vw]"
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
                  <div className="relative ms-calc--26vh-156px min-w-768-max-w-1024:ms-calc--23vh-156px max-w-1023-max-w-736:ms-[-15vw]">
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
                            (customizeTabRefs.current[
                              currentIncrementIndex - 1
                            ] = ref)
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
                            className="ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:ms-calc--23vh-156px min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:ms-[-15vw] max-w-1023-max-w-736:w-[85vw]"
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
                className="relative z-[5] ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:ms-calc--23vh-156px min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:ms-[-15vw] max-w-1023-max-w-736:w-[85vw]"
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
                            (customizeTabRefs.current[
                              currentIncrementIndex - 1
                            ] = ref)
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
                            className="ms-calc--26vh-156px aspect-auto w-[52vh] max-w-[500px] min-w-768-max-w-1024:ms-calc--23vh-156px min-w-768-max-w-1024:w-[46vh] max-w-1023-max-w-736:ms-[-15vw] max-w-1023-max-w-736:w-[85vw]"
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
    </>
  );
}

export default CustomizationSelector;
