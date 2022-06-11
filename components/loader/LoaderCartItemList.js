import { Grid, Skeleton } from "@mui/material";

function LoaderCartItemList({ length = "asdfasdfasdd" }) {
  return (
    <div>
      {length?.split("").map((x) => (
        <div className="h-[100px] flex p-3 ring-1 ring-gray-200  my-4">
          <Skeleton variant="rectangular" width={100} height={"100%"} />
          <div className="flex-1 px-3">
            <Skeleton variant="text" />
            <Skeleton variant="text" width={"40%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoaderCartItemList;
