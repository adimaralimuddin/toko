import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Slider,
  Typography,
} from "@mui/material";

import useProduct from "../../controls/productControls";
import PrimaryButton from "../elements/PrimaryButton";

const cats = ["device", "clothing", "toy", "furniture", "food", "tool"];

function MainQuerySideBar({ flex }) {
  const {
    getAllProducts,
    category,
    subCategory,
    minPrice,
    maxPrice,
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
  };

  return (
    <div
      className={
        " bg-whited flex p-1 " +
        (flex ? " overflow-x-autod flex-wrap " : " flex-col dshadow-md")
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
            <MenuItem key={value} value={value}>
              {value}s
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Prices */}
      <div className="p-2">
        <Typography variant="body2">Min Price (${minPrice}k)</Typography>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          defaultValue={0}
          value={minPrice}
          onChange={(e, minPrice) =>
            set({ minPrice: minPrice >= maxPrice ? maxPrice : minPrice })
          }
          valueLabelDisplay="auto"
          getAriaValueText={function valuetext(value) {
            return `${value}°C`;
          }}
          disableSwap
        />
      </div>
      <div className="p-2">
        <Typography variant="body2">Max Price (${maxPrice}k)</Typography>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          defaultValue={100}
          value={maxPrice}
          marks
          step={10}
          max={300}
          onChange={(e, maxPrice) =>
            set({ maxPrice: maxPrice <= minPrice ? minPrice : maxPrice })
          }
          valueLabelDisplay="auto"
          getAriaValueText={function valuetext(value) {
            return `${value}just a test`;
          }}
          disableSwap
        />
      </div>

      <div className="p-2">
        <Typography variant="body2">Ratings ({ratings})</Typography>
        <Rating
          onChange={(e, ratings) => set({ ratings })}
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
        />
      </div>

      <FormControl sx={{ m: 1, minWidth: 90 }}>
        <InputLabel id="demo-simple-select-label">shiping fee (Max)</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={shipingFee}
          defaultValue={6}
          label="shiping fee"
          onChange={(e) => set({ shipingFee: e.target.value })}
        >
          {[0, 2, 3, 4, 5, 6]?.map((value) => (
            <MenuItem key={value} value={value}>
              ${value}
            </MenuItem>
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
          defaultValue={0}
          label="discount"
          onChange={(e) => set({ originalPrice: e.target.value })}
        >
          {[10, 20, 30, 40, 50, 60]?.map((value) => (
            <MenuItem key={value} value={value}>
              {value}% OFF
            </MenuItem>
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
      <PrimaryButton onClick={onApplyHandler}>APPLY</PrimaryButton>
    </div>
  );
}

export default MainQuerySideBar;
