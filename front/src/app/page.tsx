import BillsTable from "@/components/bills-table";
import LegislatorsTable from "@/components/legislators-table";

export default async function Home() {
  return (
    <main className="my-6 mx-2 flex space-x-2">
      <LegislatorsTable />
      <BillsTable />
    </main>
  );
}
