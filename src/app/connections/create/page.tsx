import Form from "@/app/ui/connections/create-connection-form";

const Title = ({ title }: { title: string }) => {
  return <h1 className="text-4xl mb-4 font-bold text-gray-700">{title}</h1>;
};

export default function Page() {
  return (
    <section className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="text-center">
        <Title title="Create database connection" />
        <Form />
      </div>
    </section>
  );
}
