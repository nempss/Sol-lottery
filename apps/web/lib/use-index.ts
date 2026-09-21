"use client";
import { useEffect, useState } from "react";
export function useIndex<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [source, setSource] = useState("loading");
  useEffect(() => {
    fetch(url, { cache: "no-store" }).then((r) => r.json()).then((j) => { setSource(j.source ?? "unknown"); setData(j.items ?? j.item ?? j); }).catch(() => setSource("error"));
  }, [url]);
  return { data, source };
}
