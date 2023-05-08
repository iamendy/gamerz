import Link from "next/link";

const Success = () => {
  return (
    <div className="modal bg-indigo-500 w-[90%] lg:max-w-[600px] p-5">
      <p>Congratulations! 🎉</p>
      <p>your Order has been received!</p>

      <Link
        className="bg-black text-white px-5 py-4 rounded-sm inline-block"
        href="/"
      >
        View Market
      </Link>
    </div>
  );
};
export default Success;
