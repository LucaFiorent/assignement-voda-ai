import { FC } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { PaginationP } from "../../../types/componentPropsT";

const Pagination: FC<PaginationP> = ({
  totalPages,
  onChange,
  activePage,
  inactive,
}) => {
  return (
    <div className="flex gap-5 items-center justify-center mt-8 mb-8 text-gray-900 dark:text-gray-100">
      <div className="flex items-center">
        <button
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo(0, 120);
            onChange(activePage - 1);
          }}
          disabled={activePage <= 1}
        >
          <CircleArrowLeft size={28} />
        </button>
      </div>
      {Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter(
          (page) =>
            page === 1 || // if page is 1 show the first page
            page === totalPages || // if page is like the count, show the last
            (page >= activePage - 1 && page <= activePage + 1) // show 2 pages that are before and after the current page
        )
        .map((page: number) => {
          return (
            <button
              key={page}
              className={`flex items-center justify-center cursor-pointer w-7 h-7  ${
                activePage === page &&
                "bg-blue-300 text-blue-600 dark:bg-purple-400 dark:text-purple-950 rounded-full  font-bold"
              }`}
              onClick={() => {
                window.scrollTo(0, 120);
                onChange(page);
              }}
            >
              {page}
            </button>
          );
        })}
      <div className="flex items-center">
        <button
          className={`${!inactive ? "cursor-pointer" : "cursor-wait"}`}
          onClick={() => {
            if (!inactive) {
              window.scrollTo(0, 120);
              onChange(activePage + 1);
            }
          }}
          disabled={activePage >= totalPages}
        >
          <CircleArrowRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
