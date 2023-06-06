import React from "react";
import { getSettings } from "@/lib/sanity/client";
import Quiz from "./quiz";

export default async function QuizPage() {
  const settings = await getSettings();
  return <Quiz settings={settings} />;
}
