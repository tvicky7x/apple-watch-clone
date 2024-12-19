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
}) {
  return (
    <div
      className={`${customizeActive ? "block" : "hidden"} absolute bottom-[61px] left-1/2 flex -translate-x-1/2 animate-showAnimation1d5s items-center gap-x-[12px] opacity-0`}
    >
      {customizeWatchJson
        .find((item) => item?.id === currentCollection)
        ?.collectionCustomization?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => customizeTabVariantsHandler(item)}
              className="flex flex-shrink-0 items-center rounded-full bg-customizeTabBg px-[18px] capitalize"
            >
              <Image
                loading="lazy"
                src={imagePrefixHandler(item?.customizeImageUrl, "/svg")}
                alt={item?.customizeName}
                width={25}
                height={25}
                className="h-[25px] w-auto px-[5px]"
              />
              <div className="my-[5px] flex flex-nowrap text-nowrap text-[16.87px] leading-[20px]">
                {customizeTabVariants?.id === item?.id ? (
                  <ul className="animate-openfilter flex flex-nowrap text-nowrap">
                    {customizeTabVariants?.variants?.map((element, index) => {
                      return (
                        <li
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
                    {item?.customizeName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CustomizeTabs;
