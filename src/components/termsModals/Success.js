import Link from "next/link";

const Success = () => {
  return (
    <div className="modal bg-indigo-500 w-[90%] lg:max-w-[600px] p-5 lg:p-9 space-y-3">
      <h3 className="text-lg font-bold mb-2">Congratulations! 🎉</h3>
      <p>your Term has been created!</p>

      <Link
        className="bg-black text-white px-5 py-4 rounded-lg inline-block"
        href="/"
      >
        View Market
      </Link>
    </div>
  );
};
export default Success;
