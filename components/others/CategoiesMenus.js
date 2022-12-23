import Link from "next/link";

const cats = ["device", "clothing", "toy", "furniture", "food", "tool"];

export default function CategoiesMenus() {
  return (
    <div className="flex items-center flex-wrap justify-center bg-violet-500d bg-[#8956d2] bg-[#bf3131]d p-[2px]">
      {cats?.map((cat) => (
        <Link key={cat} href={`/filter?category=${cat}`}>
          <p className="text-white px-2 text-[.8rem] hover:shadow-md hover:scale-105 cursor-pointer ">
            {cat}s
          </p>
        </Link>
      ))}
    </div>
  );
}
