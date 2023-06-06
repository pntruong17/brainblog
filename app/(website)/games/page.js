import React from "react";
import { getSettings } from "@/lib/sanity/client";
import Games from "./games";

export default async function GamePage() {
  const settings = await getSettings();
  return <Games settings={settings} />;
}
