import { Skeleton } from "@mui/material";

function LoaderCartItemList({ length = "asdfasdfasdd" }) {
  return (
    <div className="max-w-6xl mx-auto w-full">
      {length?.split("").map((x, i) => (
        <div key={i} className="rounded-xl flex p-3 ring-1 ring-gray-200  my-4">
          <Skeleton
            className="rounded-xl"
            variant="rectangular"
            width={110}
            height={110}
          />
          <div className="flex-1 flex flex-col px-3">
            <Skeleton variant="text" width={"40%"} height={"35px"} />
            <div className="flex gap-3 flex-wrap justify-between">
              <Skeleton className="mr-auto" variant="text" width={"15%"} />
              <Skeleton variant="text" width={"15%"} />
              <Skeleton variant="text" width={"15%"} />
              <Skeleton variant="text" width={"15%"} />
            </div>
            <div className="flex-1 mb-auto"></div>
            <div className="flex justify-between gap-3">
              <Skeleton variant="text" width={"20%"} />
              <Skeleton variant="text" width={"10%"} />
              <Skeleton className="ml-auto" variant="text" width={"20%"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoaderCartItemList;
