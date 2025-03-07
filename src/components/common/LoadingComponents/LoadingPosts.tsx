const LoadingPost = () => {
  return (
    <div className="min-w-2xs sm:min-w-sm md:min-w-md p-4 bg-slate-800 rounded-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between animate-pulse">
          <div className="flex gap-3 items-center">
            <div className="bg-slate-400 w-10 h-10 rounded-full" />
            <div className="bg-slate-400 h-5 w-20 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-rose-500 w-7 h-7 rounded-full" />
            <div className="bg-slate-400 h-5 w-10 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-slate-800 rounded-2xl animate-pulse">
          <div className="font-semibold text-lg p-4 h-15 bg-slate-900 rounded-2xl" />
          <div className="p-4 h-25 bg-slate-900 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPost;
