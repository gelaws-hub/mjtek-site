import Image from "next/image";
import Link from "next/link";

interface categoryData {
  name: string;
  url: string;
  icon: string;
}

export default function CategoryHomepage({
  categoryData,
}: {
  categoryData: categoryData[];
}) {
  return (
    <div className="my-10 w-[90vw] md:w-[100%] mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        <span className="border-x-[6px] border-blue-900 border-solid mx-4 rounded-md"></span>
        kategori
      </h1>
      <div className="flex gap-4 items-center overflow-x-scroll scrollbar-none">
        {categoryData.map((c) => (
          <Link scroll={false}
            key={c.name}
            className="h-24 w-24 md:h-40 md:w-40 aspect-square flex flex-col items-center px-1 md:p-5 border-2 border-gray-300 rounded-lg hover:bg-blue-950 hover:text-white ease-in-out duration-300 group md:gap-0 justify-between pt-4 pb-2"
            href={c.url}
          >
            <Image
              className="h-12 w-12 p-2 md:h-20 md:w-20 md:p-4 ease-in-out duration-300 group-hover:invert"
              src={c.icon}
              alt={c.name}
              width={100}
              height={100}
              style={{ borderRadius: "inherit" }}
            />
            <h3 className="md:text-sm text-[0.6rem] text-center truncate">{c.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
