import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import Styles from "../../DataTypes/StylesTypes";
import { setSelectedCategory } from "../../redux/slices/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import ConfirmDialog from "../Dialogs/LogoutDialog/confirmDialog";

import EditIcon from "@mui/icons-material/Edit";
import AddCategoryDialog from "../Dialogs/AddItemDialog/addCategoryDialog";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
  items: CategoryData[];
  editFunction: (item: object) => void;
  deleteFunction: (item: object) => void;
  styles: Styles;
}
const CategoryItemsListView = ({
  items,
  editFunction,
  deleteFunction,
  styles,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>(
    new Array(items.length).fill(null)
  );

  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const dispatch = useAppDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  //const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<CategoryData>({
    id: "",
    name: "",
    image: "",
    products: [],
    categoryType: "",
  });

  const { t } = useTranslation();
  const getString = t;

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleEditClick = (item: CategoryData) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleDeleteClick = (item: CategoryData) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ ...styles.container, padding: "0 !important" }}>
      <List sx={{...styles.categoryList , paddingBottom:0}}>
        {items.map((item, index) => (
          <ListItem
            onClick={() => {
              dispatch(setSelectedCategory(item));
            }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #BCB8B1",
              width: "100%",
              cursor: "pointer",
              borderRadius: index === items.length - 1 ? "0 0 16px 16px" : "0",
              background:
                selectedCategory.id === item.id
                  ? "var(--primary-color)"
                  : "initial",
            }}
            key={item.id}
          >
            <Box
              sx={{
                ...styles.listItemBox,
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{display:"flex" , flexDirection:"row", alignItems:"center"}}>
                    <IconButton
                      sx={{
                        padding: 0.8,
                        cursor: "grab",
                        "&:hover": {
                          background: "transparent",
                        },
                      }}
                      aria-label="more"
                    >
                      <DragIndicatorIcon
                        sx={{
                          color:
                            selectedCategory.id === item.id
                              ? "white"
                              : "var(--primary-color)",
                        }}
                        fontSize="medium"
                      />
                    </IconButton>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "18px" }}
                      variant="body1"
                      style={{
                        color:
                          selectedCategory.id === item.id
                            ? "white"
                            : "var(--primary-color)",
                      }}
                    >
                      {item.name}
                      <Typography
                        color={
                          selectedCategory.id === item.id ? "white" : "#BCB8B1"
                        }
                        sx={{marginLeft:1}}
                        component="span"
                      >
                        ({item.products.length})
                      </Typography>
                    </Typography>
                  </Box>
                }
              />
            </Box>
            <IconButton
              sx={{
                padding: 0.8,
                "&:hover": {
                  background: "#A4755D30",
                },
              }}
              aria-label="more"
              onClick={(event) => handleMenuClick(event, index)}
            >
              <MoreVertIcon
                sx={{
                  color:
                    selectedCategory.id === item.id
                      ? "white"
                      : "var(--primary-color)",
                }}
                fontSize="small"
              />
            </IconButton>
            <Menu
              id={`categoryOptions-${index}`}
              anchorEl={anchorEls[index]}
              open={Boolean(anchorEls[index])}
              onClose={() => handleMenuClose(index)}
              MenuListProps={{
                "aria-labelledby": `categoryOptions-${index}`,
              }}
              disableScrollLock={true}
              elevation={1}
            >
              <MenuItem
                onClick={() => {
                  handleEditClick(item);
                  handleMenuClose(index);
                }}
              >
                <EditIcon
                  aria-label="edit"
                  fontSize="small"
                  sx={{ marginRight: 1 }}
                />
                {getString("edit")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeleteClick(item);
                  handleMenuClose(index);
                }}
              >
                <DeleteOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} />
                {getString("delete")}
              </MenuItem>
            </Menu>
          </ListItem>
        ))}
      </List>
      <AddCategoryDialog
        title={"Edit category"}
        errorMessage={getString("addCategoryInfoText")}
        cancelText={getString("cancel")}
        confirmText={getString("update")}
        isOpen={open}
        onCancelClick={handleClose}
        onConfirmClick={editFunction}
        initialData={currentItem}
      />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onPrimaryActionClick={() => {
          deleteFunction(currentItem);
          setIsDeleteDialogOpen(false);
        }}
        onSecondaryActionClick={handleDeleteDialogClose}
        onClose={handleDeleteDialogClose}
        width="500px"
        height="300px"
        showImg={false}
        secondaryActionText={getString("cancel")}
        primaryActionText={getString("delete")}
        title={getString("deleteConfirmText")}
        subTitle={getString("categoryDeleteText", {
          categoryName: currentItem.name,
        })}
      />
    </Container>
  );
};

export default CategoryItemsListView;
