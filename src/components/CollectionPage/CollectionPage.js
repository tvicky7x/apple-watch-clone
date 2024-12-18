"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  getComponentText,
  imagePrefixHandler,
} from "@/utilities/commonFunction";
import MainHeading from "./MainHeading";
import MainWatch from "./MainWatch";
import customizeWatchJson from "../../utilities/customizeWatchJson.json";
import Image from "next/image";

function CollectionPage() {
  const content = getComponentText("collectionPage");
  const [customizeActive, setCustomizeActive] = useState(false);
  const [customizeTabActive, setCustomizeTabActive] = useState(false);
  const [customizeTabVariants, setCustomizeTabVariants] = useState({});

  //customizeActive function
  function customizeActiveHandler() {
    setCustomizeActive(true);
  }

  //Customize Tab Variants
  function customizeTabVariantsHandler(currentVariantTab) {
    setCustomizeTabVariants(currentVariantTab);
    setCustomizeTabActive(true);
  }
  console.log(customizeTabVariants);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="relative">
        <MainHeading
          content={content?.mainHeading}
          customizeActive={customizeActive}
          customizeActiveHandler={customizeActiveHandler}
        />
        {!customizeTabActive && <MainWatch customizeActive={customizeActive} />}
      </div>
      {/* Customize Tabs */}
      <div
        className={`${customizeActive ? "block" : "hidden"} animate-showAnimation1d5s absolute bottom-[61px] left-1/2 flex -translate-x-1/2 items-center gap-x-[12px] opacity-0`}
      >
        {customizeWatchJson?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => customizeTabVariantsHandler(item)}
              className="bg-customizeTabBg flex flex-shrink-0 items-center rounded-full px-[18px] py-[5px] capitalize"
            >
              <Image
                loading="lazy"
                src={imagePrefixHandler(item["customizeImageUrl"], "/svg")}
                alt={item["customizeName"]}
                width={25}
                height={25}
                className="aspect-auto h-[25px]"
              />
              <div className="flex flex-nowrap text-nowrap py-[7px] text-[16.87px] leading-[20px]">
                {customizeTabVariants["customizeName"] ===
                item["customizeName"] ? (
                  customizeTabVariants["variants"]?.map((elements, index) => {
                    return (
                      <span key={index} className="px-[6px]">
                        {elements["variantName"]}
                      </span>
                    );
                  })
                ) : (
                  <span className="pe-[6px] ps-[5px]">
                    {item["customizeName"]}
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

export default CollectionPage;
