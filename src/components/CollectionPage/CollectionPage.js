"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { getComponentText } from "@/utilities/commonFunction";
import MainHeading from "./MainHeading";
import MainWatch from "./MainWatch";

function CollectionPage() {
  const content = getComponentText("collectionPage");
  const [customizeActive, setCustomizeActive] = useState(false);

  //   customizeActive function
  function customizeActiveHandler() {
    setCustomizeActive(true);
  }

  return (
    <div className="relative">
      <Navbar />
      <div className="relative">
        <MainHeading
          content={content?.mainHeading}
          customizeActive={customizeActive}
          customizeActiveHandler={customizeActiveHandler}
        />
        <MainWatch customizeActive={customizeActive} />
      </div>
      <div></div>
    </div>
  );
}

export default CollectionPage;
