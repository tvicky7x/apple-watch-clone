import { imagePrefixHandler } from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";

function CustomizeTabs({
  customizeWatchJson,
  customizeActive,
  customizeTabVariantsHandler,
  currentCollection,
  currentSize,
  currentCase,
  currentBand,
  customizeTabVariants,
  changeCurrentCustomizations,
}) {
  return (
    <div
      className={`${customizeActive ? "block" : "hidden"} absolute bottom-[61px] w-full animate-showAnimation1d8s overflow-x-auto px-[18px] opacity-0 max-h-770:bottom-[20px]`}
    >
      <div className="mx-auto flex w-max justify-center gap-x-[12px]">
        {customizeWatchJson
          .find((item) => item?.id === currentCollection)
          ?.variants?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => customizeTabVariantsHandler(item)}
                className="inline-flex flex-shrink-0 items-center rounded-full bg-customizeTabBg px-[18px] capitalize max-w-1023-max-w-736:px-[12px]"
              >
                <Image
                  loading="lazy"
                  src={imagePrefixHandler(item?.variantImageUrl, "/svg")}
                  alt={item?.variantName}
                  width={25}
                  height={25}
                  className="h-[25px] w-auto px-[5px] max-w-1023-max-w-736:h-[21px]"
                />
                <div className="my-[5px] flex flex-nowrap text-nowrap text-[16.87px] leading-[20px] max-w-1023-max-w-736:my-[1px] max-w-1023-max-w-736:text-[14px]">
                  {customizeTabVariants?.id === item?.id ? (
                    <ul className="flex animate-openfilter flex-nowrap text-nowrap">
                      {customizeTabVariants?.variants?.map((element, index) => {
                        return (
                          <li
                            onClick={() => {
                              changeCurrentCustomizations(
                                element?.id,
                                item?.changeId,
                              );
                              if (element?.variants) {
                                changeCurrentCustomizations(
                                  element?.variants[0].id,
                                  element?.changeId,
                                );
                              }
                            }}
                            key={index}
                            className={`${(element?.id === currentSize || element?.id === currentCase || element?.id === currentBand) && "font-semibold"} cursor-pointer px-[6px] py-[6px]`}
                          >
                            {element?.variantName}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <span className="cursor-pointer py-[6px] pe-[3px] ps-[1px]">
                      {item?.variantName}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CustomizeTabs;
