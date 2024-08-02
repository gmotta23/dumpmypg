import Form from "@/app/ui/databases/create-connection-form";

export default function Page() {
  return (
    <section className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl mb-4 font-bold text-gray-700">
          Create database connection
        </h1>
        <Form />
      </div>
    </section>
  );
}
