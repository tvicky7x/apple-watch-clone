import { Dialog } from "@mui/material";
import React from "react";

function CollectionDialogBox({
  open,
  onClose,
  customizeWatchJson,
  currentCollection,
  changeCurrentCollection,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "#32323270",
        },
      }}
      PaperProps={{
        style: {
          position: "absolute",
          top: "62px",
          left: "50%",
          transform: "translateX(-50%)",
          margin: "0",
          borderRadius: "16px",
          overflow: "hidden",
          width: "320px",
        },
      }}
    >
      <div className="px-[26px] py-[18px] text-center">
        {customizeWatchJson?.map((item, index, array) => {
          return (
            <React.Fragment key={index}>
              <p
                onClick={() => {
                  changeCurrentCollection(item?.id);
                  onClose();
                }}
                className={`${currentCollection === item?.id ? "text-collectionActiveColor" : "hover:text-collectionHoverColor"} cursor-pointer text-[17px] leading-[25px] tracking-[-0.37px]`}
              >
                {item["collectionName"]}
              </p>
              {index !== array.length - 1 && (
                <div className="my-[17px] h-[1px] bg-collectionDivider" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Dialog>
  );
}

export default CollectionDialogBox;
