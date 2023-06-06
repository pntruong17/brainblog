import React from "react";
import { getSettings } from "@/lib/sanity/client";
import IQTest from "./iqtest";

export default async function IQPage() {
  const settings = await getSettings();
  return <IQTest settings={settings} />;
}
