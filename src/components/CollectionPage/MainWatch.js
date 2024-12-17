import { imagePrefixHandler } from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";

function MainWatch({ customizeActive }) {
  return (
    <div
      className={`${!customizeActive ? "top-[33.75rem] scale-[2]" : "top-0 scale-[1]"} absolute left-1/2 -translate-x-1/2 transition-all duration-[1.5s] ease-in-out`}
    >
      <div className="animate-showAnimation opacity-0">
        <Image
          src={imagePrefixHandler("/MYA33ref_SR_S10_VW_PF.jpeg", "/jpeg")}
          alt="main-watch-band"
          width={1000}
          height={1000}
          priority={true}
          className="aspect-auto w-[458px]"
        />
        <Image
          src={imagePrefixHandler(
            "/watch-case-46-aluminum-jetblack-nc-s10_VW_PF+watch-face-46-aluminum-jetblack-s10_VW_PF.png",
            "/png",
          )}
          alt="main-watch-case"
          width={1000}
          height={1000}
          priority={true}
          className="absolute top-0 aspect-auto w-[458px]"
        />
      </div>
    </div>
  );
}

export default MainWatch;
