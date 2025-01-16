import { HeaderProps } from "./TableBody";

function TableHeader({ headers }: { headers: HeaderProps[] }) {
  return (
    <div className={`mb-2 grid grid-cols-${headers.length} bg-slate-300 p-3`}>
      {headers.map((col, i) => (
        <div key={i} className="col-span-1">
          {col.label}
        </div>
      ))}
    </div>
  );
}

export default TableHeader;
