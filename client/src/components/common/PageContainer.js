import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const PageContainer = ({
  title,
  children,
  maxWidth = "lg",
  paperProps = {},
  containerProps = {},
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        py: 4,
        minHeight: "calc(100vh - 64px)",
        ...containerProps?.sx,
      }}
      {...containerProps}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          ...paperProps?.sx,
        }}
        {...paperProps}
      >
        {title && (
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 4,
            }}
          >
            {title}
          </Typography>
        )}
        <Box>{children}</Box>
      </Paper>
    </Container>
  );
};

export default PageContainer;
