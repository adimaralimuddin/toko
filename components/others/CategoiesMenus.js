import Link from "next/link";

const cats = ["device", "clothing", "toy", "furniture", "food", "tool"];

export default function CategoiesMenus() {
  return (
    <div className="flex items-center flex-wrap justify-center bg-orange-500">
      {cats?.map((cat) => (
        <Link href={`/filter?category=${cat}`}>
          <p className="text-white px-2 text-sm hover:shadow-md hover:scale-105 cursor-pointer ">
            {cat?.toUpperCase()}S
          </p>
        </Link>
      ))}
    </div>
  );
}
