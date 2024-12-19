"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  getComponentText,
  imagePrefixHandler,
} from "@/utilities/commonFunction";
import MainHeading from "./MainHeading";
import MainWatch from "./MainWatch";
import customizeWatchJson from "../../utilities/customizeWatchJson.json";
import Image from "next/image";
import CustomizeTabs from "./CustomizeTabs";

function CollectionPage() {
  const content = getComponentText("collectionPage");
  const [currentCollection, setCurrentCollection] = useState(
    customizeWatchJson[0]?.id,
  );
  const [currentSize, setCurrentSize] = useState(
    customizeWatchJson[0]?.defaultCustomize?.currentSize,
  );
  const [currentCase, setCurrentCase] = useState(
    customizeWatchJson[0]?.defaultCustomize?.currentCase,
  );
  const [currentCaseVariant, setCurrentCaseVariant] = useState(
    customizeWatchJson[0]?.defaultCustomize?.currentCaseVariant,
  );
  const [currentBand, setCurrentBand] = useState(
    customizeWatchJson[0]?.defaultCustomize?.currentBand,
  );
  const [currentBandVariant, setCurrentBandVariant] = useState(
    customizeWatchJson[0]?.defaultCustomize?.currentBandVariant,
  );
  const [customizeActive, setCustomizeActive] = useState(false);
  const [customizeTabActive, setCustomizeTabActive] = useState(false);
  const [customizeTabVariants, setCustomizeTabVariants] = useState({});

  // changing current collection
  function changeCurrentCollection(collection) {
    setCurrentCollection(collection);
  }

  //customizeActive function
  function customizeActiveHandler() {
    setCustomizeActive(true);
  }

  //Customize Tab Variants
  function customizeTabVariantsHandler(currentVariantTab) {
    setCustomizeTabVariants(currentVariantTab);
    setCustomizeTabActive(true);
  }

  useEffect(() => {
    const currentCollectionItem = customizeWatchJson.find(
      (item) => item?.id === currentCollection,
    );
    setCurrentSize(currentCollectionItem?.defaultCustomize?.currentSize);
    setCurrentCase(currentCollectionItem?.defaultCustomize?.currentCase);
    setCurrentCaseVariant(
      currentCollectionItem?.defaultCustomize?.currentCaseVariant,
    );
    setCurrentBand(currentCollectionItem?.defaultCustomize?.currentBand);
    setCurrentBandVariant(
      currentCollectionItem?.defaultCustomize?.currentBandVariant,
    );
  }, [currentCollection]);

  return (
    <div className="relative min-h-screen">
      <Navbar
        customizeWatchJson={customizeWatchJson}
        content={content}
        changeCurrentCollection={changeCurrentCollection}
        customizeActive={customizeActive}
        currentCollection={currentCollection}
      />
      <div className="max-h-700:top-[82px] absolute top-[13vh] w-full">
        <MainHeading
          content={content?.mainHeading}
          customizeActive={customizeActive}
          customizeActiveHandler={customizeActiveHandler}
        />
        {!customizeTabActive && (
          <MainWatch
            customizeActive={customizeActive}
            currentCollection={currentCollection}
            currentSize={currentSize}
            currentCase={currentCase}
            currentCaseVariant={currentCaseVariant}
            currentBand={currentBand}
            currentBandVariant={currentBandVariant}
          />
        )}
      </div>

      {/* Customize Tabs */}
      <CustomizeTabs
        customizeWatchJson={customizeWatchJson}
        customizeActive={customizeActive}
        customizeTabVariants={customizeTabVariants}
        customizeTabVariantsHandler={customizeTabVariantsHandler}
        // All currents customization
        currentCollection={currentCollection}
        currentSize={currentSize}
        currentCase={currentCase}
        currentBand={currentBand}
      />
    </div>
  );
}

export default CollectionPage;
