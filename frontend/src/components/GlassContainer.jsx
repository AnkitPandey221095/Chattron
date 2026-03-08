import React from "react";

function GlassContainer({ children }) {
  return (
    <div className=" w-full flex items-center justify-cente">
      <div className="
        w-full  
        backdrop-blur-xl 
        bg-white/5 
        shadow-2xl 
        rounded-2xl 
      ">
        {children}
      </div>
    </div>
  );
}

export default GlassContainer;