import { imagePrefixHandler } from "@/utilities/commonFunction";
import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="relative h-[114px] px-[24px]">
      <Image
        src={imagePrefixHandler(
          "/apple-watch-design-studio-logo.jpeg",
          "/jpeg",
        )}
        alt="apple-watch-design-studio-logo"
        width={118}
        height={26}
        priority={true}
        className="absolute left-[33px] top-[32px] aspect-auto w-[90px]"
      />
    </div>
  );
}

export default Navbar;
