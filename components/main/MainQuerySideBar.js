import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";

const pricesValues = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800,
  900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
];
const ratingsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

import useProduct from "../../controls/productControls";

const cats = ["device", "clothing", "toy", "furniture", "food", "toy"];

function MainQuerySideBar({ flex }) {
  const {
    getAllProducts,
    category,
    subCategory,
    minPrice,
    maxPrice,
    sold,
    ratings,
    shipingFee,
    originalPrice,
    onSale,
    set,
  } = useProduct();

  const onApplyHandler = () => {
    const data = {
      category,
      subCategory,
      minPrice,
      maxPrice,
      ratings,
      shipingFee,
      originalPrice,
      onSale,
    };
    getAllProducts();
    console.log(data);
  };

  return (
    <div
      className={
        " bg-white  flex " +
        (flex ? " overflow-x-autod flex-wrap " : " flex-col shadow-md p-3")
      }
    >
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={category}
          defaultValue={category}
          label="category"
          onChange={(e) => set({ category: e.target?.value })}
        >
          {cats?.map((value) => (
            <MenuItem value={value}>{value}s</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">sub category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          // value={age}
          label="sub category"
          // onChange={handleChange}
        >
          {[""]?.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">min price</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={minPrice}
          defaultValue={minPrice}
          label="Min Price"
          onChange={(e) => set((p) => ({ minPrice: e.target.value }))}
        >
          {[0, ...pricesValues]?.map((value) => (
            <MenuItem value={value}>${value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">max price</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={maxPrice}
          defaultValue={maxPrice}
          label="Max Price"
          onChange={(e) => set((p) => ({ maxPrice: e.target.value }))}
        >
          {pricesValues?.map((value) => (
            <MenuItem value={value}>${value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">ratings</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={ratings}
          defaultValue={ratings}
          label="Ratings"
          onChange={(e) => set({ ratings: e.target.value })}
        >
          {ratingsValues?.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">shiping fee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={shipingFee}
          defaultValue={shipingFee}
          label="shiping fee"
          onChange={(e) => set({ shipingFee: e.target.value })}
        >
          {ratingsValues?.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">discount</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={originalPrice}
          defaultValue={originalPrice}
          label="discount"
          onChange={(e) => set({ originalPrice: e.target.value })}
        >
          {ratingsValues?.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={onSale}
              onChange={(e) => set({ onSale: e.target.checked })}
            />
          }
          label="on Sale"
        />
      </FormControl>

      <Button onClick={onApplyHandler} variant="contained" color="primary">
        APPLY
      </Button>
    </div>
  );
}

export default MainQuerySideBar;
