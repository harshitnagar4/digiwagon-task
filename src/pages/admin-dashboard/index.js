import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Header from "../../components/header";

const AdminDashboard = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getDataFormLocalStorage();
  }, []);

  const getDataFormLocalStorage = () => {
    const Data = localStorage.getItem("formData");
    const parseData = JSON.parse(Data);
    if (parseData) {
      setFormData(parseData);
    }
  };

  return (
    <>
      <Header />
      <Container>
        {formData.length === 0 && !formData.productName ? (
          <Typography variant="h6" textAlign={"center"}>
            {" "}
            Please Add Some User from User Dashboard
          </Typography>
        ) : (
          <>
            <Grid
              container
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Grid item xs={6} sx={{ width: "100%" }}>
                <Typography variant="h6" gutterBottom textAlign={"center"}>
                  {" "}
                  Product Information Name : {formData.productName}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} sx={{ width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ textAlign: "center" }}>
                        <TableCell sx={{ textAlign: "center" }}>
                          Variant Names
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.variants.map((row) => (
                        <TableRow
                          key={row.name1}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "center" }}
                          >
                            {row.name1}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "center" }}
                          >
                            {row.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminDashboard;
