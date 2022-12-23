export default function NoItems({ text = "0 Items Found!", children }) {
  return (
    <div className=" h-[70%] w-full text-xl flex flex-col items-center justify-center text-gray-400">
      <h2 className="font-semibold">{text}</h2>
      {children}
    </div>
  );
}
