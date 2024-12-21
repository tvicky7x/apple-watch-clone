"use client";
import {
  getComponentText,
  imagePrefixHandler,
} from "@/utilities/commonFunction";
import Image from "next/image";
import React, { useState } from "react";
import CollectionDialogBox from "./CollectionDialogBox";

function Navbar({
  customizeWatchJson,
  currentCollection,
  changeCurrentCustomizations,
  customizeActive,
}) {
  const content = getComponentText("collectionPage.navbar");
  const [open, setOpen] = useState(false);

  // Close collection dialog box
  function closeCollectionDialogBox() {
    setOpen(false);
  }

  return (
    <>
      <CollectionDialogBox
        open={open}
        onClose={closeCollectionDialogBox}
        customizeWatchJson={customizeWatchJson}
        currentCollection={currentCollection}
        changeCurrentCustomizations={changeCurrentCustomizations}
      />
      <div className="relative h-[117px] select-none px-[24px]">
        <Image
          src={imagePrefixHandler(
            "/apple-watch-design-studio-logo.jpeg",
            "/jpeg",
          )}
          alt="apple-watch-design-studio-logo"
          width={118}
          height={26}
          priority={true}
          className="absolute left-[33px] top-[32px] aspect-auto w-[90px] max-w-1023-max-w-736:left-1/2 max-w-1023-max-w-736:top-[20px] max-w-1023-max-w-736:w-[76px] max-w-1023-max-w-736:-translate-x-1/2"
        />
        <p
          onClick={() => setOpen(true)}
          className={`${customizeActive ? "block" : "hidden"} absolute left-1/2 top-[32px] flex -translate-x-1/2 cursor-pointer items-center gap-x-[5.2px] text-[17px] leading-[25px] tracking-[-0.37px] max-w-1023-max-w-736:left-[72px] max-w-1023-max-w-736:top-[57px]`}
        >
          {content?.collection?.para}
          <Image
            loading="lazy"
            src={imagePrefixHandler("/arrow-down.svg", "/svg")}
            alt="arrow down icon"
            width={8.54}
            height={4.87}
            className="aspect-auto w-[10px]"
          />
        </p>
        <button
          className={`${customizeActive ? "block" : "hidden"} absolute right-[18px] top-[24px] animate-showAnimation1d8s rounded-full bg-primaryButtonColor px-[16px] py-[9px] text-[13.67px] leading-[18px] tracking-[-0.22px] text-white opacity-0 hover:bg-primaryButtonColor/[0.97] max-w-1023-max-w-736:top-[48px]`}
        >
          {content?.save?.para}
        </button>
      </div>
    </>
  );
}

export default Navbar;
