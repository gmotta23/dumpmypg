import React from "react";

const Title = ({ title }: { title: string }) => {
  return <h1 className="text-4xl my-8 font-bold text-gray-700">{title}</h1>;
};

export default function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center h-screen w-full bg-gray-100">
      <div className="text-center">
        {title && <Title title={title} />}
        {children}
      </div>
    </section>
  );
}
