import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button, Container, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useProduct } from "../../redux/productSlice";

function InputSearchBox() {
  const {
    title,
    searchItems,
    category,
    searchItem,
    getSearchItem,
    isOpenSearchItems,
    setOpenSearchItems,
  } = useProduct();

  return (
    <Box sx={{ flexGrow: 1, minWidth: "100px" }}>
      <div className=" max-w-[800px] bg-[#8872e0] p-[2px] mx-auto min-w-[50px]  flex flex-1 h-[35px] rounded-md">
        <button
          onClick={getSearchItem}
          className="bg-[#8872e0] px-1 text-white text-center justify-center items-center flex w-[40px] rounded-xl "
        >
          <SearchRoundedIcon fontSize="medium" />
        </button>
        <input
          value={title}
          onInput={(e) => {
            searchItem(e.target.value);
          }}
          onBlur={(_) => {
            setTimeout(() => {
              setOpenSearchItems(false);
            }, 500);
          }}
          onClick={(_) => setOpenSearchItems(true)}
          style={{ border: "none" }}
          className=" px-2 p-0 text-[.9rem] min-w-[50px] outline-0 flex-1 ring-0 rounded-sm "
          type="text"
          autoComplete="off"
          placeholder="Search "
        />
      </div>

      {isOpenSearchItems && (
        <Container
          maxWidth="large"
          className="bg-white absolute top-[65px] shadow-md left-0 w-full   min-h-[200px] z-[9999]"
        >
          <Box className="p-3 flex justify-between max-w-5xl mx-auto">
            <Typography color="primary">
              Result for :{title} ({searchItems?.length}) item(s) found
            </Typography>
            <Button
              onClick={(_) => setOpenSearchItems(false)}
              size="small"
              className="hover:ring-orange-500 hover:ring-1 rounded-md"
            >
              Close
            </Button>
          </Box>
          <Box className="max-w-5xl mx-auto max-h-[70vh] overflow-y-auto">
            {searchItems?.map((item) => (
              <SearchedItem
                item={item}
                setOpenSearchItems={setOpenSearchItems}
                key={item?._id}
              />
            ))}
          </Box>
        </Container>
      )}
    </Box>
  );
}

function SearchedItem({ item, setOpenSearchItems }) {
  const router = useRouter();
  const onClickHandler = () => {
    setOpenSearchItems(false);
    router.push(`/products/${item?._id}`);
  };

  return (
    <ListItem
      disablePadding
      onClick={onClickHandler}
      className="flex justify-between items-center p-1 px-3 hover:bg-gray-100 cursor-pointer"
    >
      <span className="flex-1 flex items-center">
        <p>{item?.title}</p>
      </span>
      <p>{item?.curPrice}</p>
    </ListItem>
  );
}

export default InputSearchBox;
