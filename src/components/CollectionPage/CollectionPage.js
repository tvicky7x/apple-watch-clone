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
import CustomizeTabs from "./CustomizeTabs";
import CustomizationSelector from "./CustomizationSelector";

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
  const [sideViewActive, setSideViewActive] = useState(false);

  // changing current collection
  function changeCurrentCustomizations(value, key) {
    switch (key) {
      case "collection":
        setCurrentCollection(value);
        break;
      case "size":
        setCurrentSize(value);
        break;
      case "case":
        setCurrentCase(value);
        break;
      case "caseVariant":
        setCurrentCaseVariant(value);
        break;
      case "band":
        setCurrentBand(value);
        break;
      case "bandVariant":
        setCurrentBandVariant(value);
        break;
    }
    setSideViewActive(false);
  }

  // Activate side view
  function sideViewHandler() {
    setSideViewActive(!sideViewActive);
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
    <div className="relative h-screen min-h-[37rem] overflow-hidden">
      <Navbar
        customizeWatchJson={customizeWatchJson}
        changeCurrentCustomizations={changeCurrentCustomizations}
        customizeActive={customizeActive}
        currentCollection={currentCollection}
      />
      <div className="absolute top-[13vh] w-full max-h-700:top-[82px] min-h-1100:top-[21vh]">
        <MainHeading
          content={content?.mainHeading}
          customizeActive={customizeActive}
          customizeActiveHandler={customizeActiveHandler}
        />
        <MainWatch
          customizeActive={customizeActive}
          customizeTabActive={customizeTabActive}
          sideViewActive={sideViewActive}
          sideViewHandler={sideViewHandler}
          customizeTabVariants={customizeTabVariants}
          // All current customization
          currentCollection={currentCollection}
          currentSize={currentSize}
          currentCase={currentCase}
          currentCaseVariant={currentCaseVariant}
          currentBand={currentBand}
          currentBandVariant={currentBandVariant}
        />

        <div className="absolute top-0 z-20 w-full max-w-1023-max-w-736:top-[40%] max-w-1023-max-w-736:-translate-y-[40%]">
          {customizeTabActive && (
            <CustomizationSelector
              customizeTabVariants={customizeTabVariants}
              changeCurrentCustomizations={changeCurrentCustomizations}
              sideViewActive={sideViewActive}
              sideViewHandler={sideViewHandler}
              currentCollection={currentCollection}
              currentSize={currentSize}
              currentCase={currentCase}
              currentCaseVariant={currentCaseVariant}
              currentBand={currentBand}
              currentBandVariant={currentBandVariant}
            />
          )}
        </div>
      </div>

      {/* Customize Tabs */}
      <CustomizeTabs
        customizeWatchJson={customizeWatchJson}
        customizeActive={customizeActive}
        customizeTabVariants={customizeTabVariants}
        customizeTabVariantsHandler={customizeTabVariantsHandler}
        changeCurrentCustomizations={changeCurrentCustomizations}
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
