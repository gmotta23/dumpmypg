import Form from "@/app/ui/connections/create-connection-form";
import Section from "@/app/ui/display/section";

export default function Page() {
  return (
    <Section title="Create database connection">
      <div className="container w-screen">
        <Form />
      </div>
    </Section>
  );
}
