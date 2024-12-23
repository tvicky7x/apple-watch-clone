import SavePage from "@/components/SavePage/SavePage";
import React from "react";

function page() {
  return (
    <>
      <React.Suspense>
        <SavePage />
      </React.Suspense>
    </>
  );
}

export default page;
