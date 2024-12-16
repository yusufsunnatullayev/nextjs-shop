"use client";

import React, { FC, ReactNode } from "react";
import { Client, HydrationProvider } from "react-hydration-provider";

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <HydrationProvider>
      <Client>{children}</Client>
    </HydrationProvider>
  );
};

export default Provider;
