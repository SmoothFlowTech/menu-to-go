import {
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorsSection from "../../components/TemplateComponents/ColorsSection/ColorsSection";
import FontSectionComponent from "../../components/TemplateComponents/FontSection/FontSectionComponent";
import CategoryShapesComponent from "../../components/TemplateComponents/CategoryShapesSection/CategoryShapesComponent";
import ContactLinksComponent from "../../components/TemplateComponents/ContactLinksSection/ContactLinksComponent";
import { useEffect, useState } from "react";
import ChooseViewTypeSection from "../../components/TemplateComponents/ChooseViewTypeSection/ChooseViewTypeSection";
export default function TemplatePage() {
  const { t } = useTranslation();
  const getString = t;
  const [bigScreen, setBigScreen] = useState<number>(2000);
  useEffect(() => {
    setBigScreen(window.innerWidth);
  }, []);
  return (
    <>
      <Typography
        sx={{
          color: "#797979",
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          textAlign: "left",
          margin: 0,
        }}
        variant="h5"
      >
        {getString("customizeYourMenu")}
      </Typography>
      <Divider
        sx={{
          marginTop: "1rem",
          width: "40%",
        }}
      />
      <Container
        id="mainContainer"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          padding: 0,
          margin: 0,
          minWidth: "inherit !important",
          maxWidth: "inherit !important",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            width: bigScreen > 2000 ? "40%" : "50%",
            marginRight: "inherit !important",
            marginLeft: "inherit !important",
            marginBottom: { xs: "2rem", md: 0 },
          }}
        >
          <ChooseViewTypeSection />
          <ColorsSection />
          <FontSectionComponent />
          <CategoryShapesComponent />
          <ContactLinksComponent />
        </Container>

        <Paper
          elevation={6}
          sx={{
            marginTop: { xs: "1rem", md: "3rem" },
            padding: 0,
            borderRadius: "2rem",
            width: bigScreen > 2000 ? "29vw" : "37vw",
          }}
        >
          <Card
            title={"Embedded Content"}
            id="menuLiveViewContainerid"
            sx={{
              height: "100%",
              padding: 0,
              margin: 0,
              borderRadius: "2rem",
            }}
          >
            <CardContent
              sx={{
                ":last-child": { padding: 0 },
                height: "100%",
                width: "100%",
                padding: 0,
                margin: 0,
                borderRadius: "2rem",
              }}
            >
              <iframe
                src={"http://localhost:5173/dashboard"}
                title={"menu"}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              ></iframe>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </>
  );
}
