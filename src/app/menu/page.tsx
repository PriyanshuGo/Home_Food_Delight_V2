import React from "react";

function Page() {
  return (
    <div
      className="hide-scrollbar"
      style={{
        width: "100%",
        height: "100vh", // full viewport height
        overflow: "auto", // allow scrolling if needed
        backgroundColor: "#f8f8f8",
      }}
    >
      <iframe
        src="/Menu.pdf#toolbar=0&navpanes=0"
        title="HFD PDF"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default Page;
