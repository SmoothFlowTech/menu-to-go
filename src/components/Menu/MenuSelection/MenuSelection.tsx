// src/components/MenuSelection/MenuSelection.tsx
import React from "react";
import { Box, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/reduxHooks";
import {
  setSelectedCategory,
  setSelectedCategoryType,
} from "@redux/slices/menuSlice";
import { categoryDefaultData } from "@constants/constants";

// Define the type for the menu selection items
interface MenuSelectionItem {
  id: string;
  Label: string;
}

interface MenuSelectionProps {
  menuSelections: MenuSelectionItem[];
}

const MenuSelection: React.FC<MenuSelectionProps> = ({ menuSelections }) => {
  const dispatch = useAppDispatch();
  const { selectedCategoryType, restaurantData } = useAppSelector(
    (state) => state.menuData
  );

  return (
    <Paper
      sx={{
        display: "flex",
        borderRadius: "29px",
        height: "64px",
        background: "#FCFDFD",
        position: "relative",
        marginTop: "2rem",
        // marginBottom: 4,
      }}
      elevation={6}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 4,
        }}
      >
        {menuSelections.map((selection) => (
          <Box
            key={selection.id}
            onClick={() => {
              if (
                selection.Label.toUpperCase() !==
                selectedCategoryType.toUpperCase()
              ) {
                dispatch(setSelectedCategory(categoryDefaultData));
              }
              dispatch(setSelectedCategoryType(selection.Label.toUpperCase()));
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                selection.Label.toLowerCase() ===
                selectedCategoryType.toLowerCase()
                  ? restaurantData.userUiPreferences.colors.secondaryColor
                  : "transparent",
              color:
                selection.Label.toLowerCase() ===
                selectedCategoryType.toLowerCase()
                  ? "#F9FDFE"
                  : "#797979",
              borderRadius: "25px",
              padding: "0.7rem",
              width: "140px",

              fontWeight: "500",
              fontFamily: restaurantData.userUiPreferences.fontType,
            }}
          >
            {selection.Label}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default MenuSelection;
