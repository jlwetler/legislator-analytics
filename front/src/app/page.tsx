import BillsTable from "@/components/bills-table";
import LegislatorsTable from "@/components/legislators-table";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="my-10 mx-auto space-y-10">
      <div className="flex space-x-3 justify-center">
        <Image
          src="/quorum.png"
          alt="Quorum logo"
          width={70}
          height={70}
          className="rounded-lg"
        />
        <span className="m-auto font-semibold text-4xl">
          Quorum Coding Challenge
        </span>
      </div>
      <div className="flex space-x-24 justify-center">
        <LegislatorsTable />
        <BillsTable />
      </div>
    </main>
  );
}
