import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { Checkbox, IconButton, Typography } from "@mui/material";
import QuantityEditor from "./others/QuantityEditor";

export default function CartItemView({
  product,
  selectItem,
  deletePayItem,
  incPayItemQnty,
  decPayItemQnty,
  deselect,
  type,
}) {
  const onSelectHandler = (e) => {
    const value = e.target.checked;
    selectItem(value, product?._id);
  };

  return (
    <div className="flex border-b py-2 sm:flex-column content-right flex-wrap items-center justify-between hover:bg-gray-100 p-1">
      <div className="flex items-center flex-1 min-w-[60%]">
        <Checkbox
          size="small"
          checked={product?.checked}
          onChange={onSelectHandler}
        />
        <img className="" src={product?.image} width="50" alt="" />
        <Typography ml variant="body2">
          {product?.name}
        </Typography>
      </div>

      <div className="flex flex-wrap">
        <Typography variant="body2" color="primary" mr>
          ${product?.curPrice}
        </Typography>
        <QuantityEditor
          increase={(_) => incPayItemQnty(product?._id)}
          decrease={(_) => decPayItemQnty(product?._id)}
          quantity={product?.quantity}
          simple="true"
        />
        <IconButton sx={{ marginLeft: 1 }}>
          <DeleteOutlineOutlined
            size="small"
            onClick={(_) => deletePayItem(product?._id)}
          />
        </IconButton>
      </div>
    </div>
  );
}
