import React from "react";

function MainHeading({ content, customizeActive, customizeActiveHandler }) {
  return (
    <div className={`relative z-10 px-[24px]`}>
      <div
        className={`${!customizeActive ? "animate-showAnimation opacity-0" : "animate-hideAnimation"} mx-auto max-w-[720px] pt-[34px]`}
      >
        <p className="text-[18.7px] leading-[29px]">{content?.para}</p>
        <h1 className="mt-[10px] flex flex-col bg-white/80 text-[57.75px] font-semibold leading-[68px] tracking-[-0.58px]">
          {content?.heading?.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </h1>
        <button
          onClick={customizeActiveHandler}
          className="mt-[43px] rounded-full bg-primaryButtonColor px-[22px] py-[12px] text-[16.73px] leading-[20px] tracking-[-0.37px] text-white"
        >
          {content?.button}
        </button>
      </div>
    </div>
  );
}

export default MainHeading;
