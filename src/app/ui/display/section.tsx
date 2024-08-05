import React from "react";
import Title from "./title";

export default function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center px-10 w-full">
      <div className="text-left">
        {title && <Title title={title} />}
        {children}
      </div>
    </section>
  );
}
