const ActiveTerm = () => {
  return (
    <div className=" rounded-md border-2 cursor-pointer hover:border-indigo-700 border-indigo-800 group hover:shadow hover:bg-indigo-600">
      <div className="px-4 py-5 lg:p-8 space-y-3">
        <div className="flex items-center space-x-3">
          <span>0x33...83D</span>
        </div>
        <div className="mt-3">
          <p className="text-lg font-medium text-gray-500 dark:text-gray-200">
            Raise to 500 ELO
          </p>
          <p className="mt-4 font-bold text-black dark:text-white">
            Price Per ELO: $4
          </p>

          <p className="mt-4 font-bold text-black dark:text-white">
            Duration: 6days
          </p>
        </div>
      </div>
    </div>
  );
};
export default ActiveTerm;
