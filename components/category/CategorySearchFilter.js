import FilterListIcon from "@mui/icons-material/FilterList";
import MainQuerySideBar from "../main/MainQuerySideBar";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

function CategorySearchFilter({ results }) {
  const [open, setOpen] = useState(false);
  return (
    <div className=" md:hiddend h-min flex flex-wrap items-center sticky w-fulld bg-white z-50 top-[102px] py-1 px-2 rounded-xl shadow-sm ">
      <div className="md:hidden ml-2">
        <Button
          size="small"
          onClick={(_) => setOpen((p) => !p)}
          variant="outlined"
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </div>
      <div>
        <Typography>{results} items(s) found</Typography>
      </div>
      {open && <MainQuerySideBar flex />}
    </div>
  );
}

export default CategorySearchFilter;
