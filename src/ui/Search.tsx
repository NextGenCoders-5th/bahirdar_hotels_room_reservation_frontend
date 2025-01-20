import { cn } from "../utils/cn";

interface SearchProps {
  onSearchHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  register: (name: string) => { ref: React.Ref<HTMLInputElement>; name: string };
  className?: string;
}
function Search({
  onSearchHandler,
  isLoading = false,
  register,
  className = "",
}: SearchProps) {
  return (
    <form
      className={cn(
        "group relative flex items-center justify-center",
        className,
      )}
      onSubmit={onSearchHandler}
    >
      <div className="flex flex-row rounded-full shadow-lg">
        <input
          type="search"
          disabled={isLoading}
          autoFocus
          className="rounded-full bg-slate-200 px-3 py-2 focus:outline-none disabled:cursor-not-allowed"
          placeholder="Search"
          {...register("search")}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="-ml-20 w-[8rem] rounded-full bg-accent-500 px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-accent-400"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
