import EditTag from "@/components/pages/tags/EditTag";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <EditTag id={id}></EditTag>;
}
