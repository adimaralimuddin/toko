import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Divider,
  Container,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import useAccount from "../../controls/accountControl";

function AccountMainPage() {
  const { user } = useUser();
  const { getAccountDetails, updateField, details } = useAccount();

  useEffect(() => {
    if (user) {
      getAccountDetails(user?.email);
    }
  }, [user]);

  return (
    <Container maxWidth="md">
      <div className="p-5 m-2 bg-white flex-1 shadow-md">
        <Box className="mb-3">
          <Typography variant="h6">My Profile</Typography>
          <Typography variant="body2">Manage my profile</Typography>
        </Box>
        <Divider />

        <Box>
          <Updatable disabled label="Email" value={user?.email} />
          <Updatable
            onUpdate={(value) => updateField({ userName: value }, user?.email)}
            label="Username"
            value={details?.userName || user?.name}
          />
          <Divider />
          <Stack spacing={2} direction="column" sx={{ marginTop: 2 }}>
            <Typography variant="h6">Payment's Address</Typography>
            <Updatable
              label="Country"
              value={details?.country}
              onUpdate={(value) => updateField({ country: value }, user?.email)}
            />
            <Updatable
              label="City"
              value={details?.city}
              onUpdate={(value) => updateField({ city: value }, user?.email)}
            />
            <Updatable
              label="Street"
              value={details?.street}
              onUpdate={(value) => updateField({ street: value }, user?.email)}
            />
            <Updatable
              label="House Number"
              value={details?.houseNumber || "none"}
              onUpdate={(value) =>
                updateField({ houseNumber: value }, user?.email)
              }
            />
          </Stack>
        </Box>
      </div>
    </Container>
  );
}

function Updatable({ value, label, onUpdate, disabled }) {
  const [editing, setEditing] = useState(false);
  const [value_, setValue] = useState(value);

  const onClickHandler = (e) => {
    if (editing) {
      setEditing(false);
      onUpdate(value_);
    } else {
      setEditing(true);
    }
  };

  function romio() {
    return "what is this";
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        m
        divider={<Divider orientation="vertical" flexItem />}
      >
        {!editing && <Typography variant="body1">{label}</Typography>}
        {!editing && <Typography ml>{value}</Typography>}
        {editing && (
          <TextField
            onChange={(e) => setValue(e.target.value)}
            value={value_}
            defaultValue={value}
            autoFocus
            label={label}
            size="small"
            fullWidth
          />
        )}

        {!disabled && (
          <Button onClick={onClickHandler} size="small" variant="outlined">
            {editing ? "Update" : "Edit"}
          </Button>
        )}
        {!disabled && editing && (
          <Button
            onClick={(_) => setEditing(false)}
            color="warning"
            size="small"
          >
            Cancel
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default AccountMainPage;
