import SearchIcon from "@mui/icons-material/Search";
import AddItemDialog from "../AddItemDialogComponent/AddItemDialog"; // Adjust the import path
import Styles from "../../DataTypes/StylesTypes";
import ItemsGridView from "../Views/ItemsGridView";
import { Button, Paper, Stack, SvgIconTypeMap, TextField } from "@mui/material";
import { useState } from "react";
// import AddItemDialog from "../AddItemDialogComponent/AddItemDialog"; // Adjust the import path7
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface BoxComponentProps {
  items: any[];
  styles: Styles;
  editFunction: (item: object) => void;
  deleteFunction: (item: object) => void;
  addFunction: (item: { name: string }) => void;
  CardIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const BoxComponent = ({
  CardIcon,
  items,
  styles,
  editFunction,
  deleteFunction,
  addFunction,
}: BoxComponentProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const EmptyState = () => {
    return (
      <>
        <p>no items</p>
      </>
    );
  };
  return (
    <Paper elevation={3} sx={styles.paper}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TextField
          sx={styles.searchField}
          variant="outlined"
          placeholder="   Search"
          color="primary"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          fullWidth
        />
        <Button
          sx={styles.addButton}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </Stack>
      {/* {items && (
        <ItemsGridView
          CardIcon={CardIcon}
          items={items}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
          styles={styles}
        />
      )}

      {!items && <EmptyState />}
      <AddItemDialog open={open} onClose={handleClose} onAdd={addFunction} /> */}
      <ItemsGridView
        CardIcon={CardIcon}
        items={items}
        editFunction={editFunction}
        deleteFunction={deleteFunction}
        styles={styles}
      />
      {/* <AddItemDialog open={open} onClose={handleClose} onAdd={addFunction} /> */}
      <AddItemDialog
        title="Add restaurant"
        fileUpload={false}
        errorMessage="Please enter restaurant name"
        cancelText="Cancel"
        confirmText="Add"
        isOpen={open}
        onCancelClick={handleClose}
        onConfirmClick={addFunction}
      />
    </Paper>
  );
};

export default BoxComponent;
