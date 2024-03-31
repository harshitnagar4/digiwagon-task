import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Cancel, Celebration } from "@mui/icons-material";
import Header from "../../components/header";
import { setModalOpen } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import OrderModal from "../../components/order-modal";

const UserDashBoard = () => {
  const [inpVal, setInpVal] = useState("");
  const [parseValue, setParseValue] = useState(false);
  const [formDataValue, setFormDataValue] = useState({
    variants: [{ name1: "", amount: 0 }],
  });
  const dispatch = useDispatch();
  const modalData = {heading:'Congratulation',icon:<Celebration color='purple' fontSize='small'/>,desc:'your Data Has Been stored Please go to the admin Dashboard'}

  const addVariant = () => {
    setFormDataValue((prevState) => ({
      variants: [...prevState.variants, { name1: "", amount: 0 }],
    }));
  };

  const valueHandler = (event, index) => {
    const { name, value } = event.target;
    const updatedVariants = [...formDataValue.variants];
    updatedVariants[index] = { ...updatedVariants[index], [name]: value };
    setFormDataValue((prevState) => ({
      ...prevState,
      variants: updatedVariants,
    }));
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (inpVal && formDataValue) {
      setFormDataValue((prev) => {
        return { ...prev, productName: inpVal };
      });
    }
    setParseValue(true);
    dispatch(setModalOpen(true));
  };
  const variantRemover = (index) => {
    if (formDataValue.variants.length > 0) {
      const filterData = formDataValue.variants.filter(
        (item, i) => i !== index
      );
      setFormDataValue((prevState) => ({
        ...prevState,
        variants: filterData,
      }));
    }
  };

  useEffect(() => {
    if (parseValue && formDataValue && inpVal) {
      localStorage.setItem("formData", JSON.stringify(formDataValue));
      setInpVal("");
      setParseValue(false);
      setFormDataValue({
        variants: [{ name1: "", amount: 0 }],
      });
    }
  }, [parseValue, formDataValue,inpVal]);

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h5" textAlign={"center"}>
          User Dashboard
        </Typography>
        <form onSubmit={formHandler}>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={8} xs={12}>
              <Typography variant="body2" gutterBottom>
                Product Information
              </Typography>

              <TextField
                type="text"
                variant="outlined"
                fullWidth
                placeholder="ProductName"
                onChange={(event) => setInpVal(event.target.value)}
                name="ProductName"
                value={inpVal}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {formDataValue.variants.map((variant, index) => (
              <Grid item md={8} xs={12} key={index}>
                <Grid container spacing={2} rowSpacing={1} marginTop={1}>
                  <Grid item md={7} xs={6}>
                    <TextField
                      type="text"
                      variant="outlined"
                      fullWidth
                      label="Name"
                      placeholder="Name"
                      value={variant.name1}
                      onChange={(event) => valueHandler(event, index)}
                      name="name1"
                      required
                    />
                  </Grid>
                  <Grid item md={5} xs={5}>
                    <Box component={"div"} display={"flex"}>
                      <TextField
                        type="number"
                        variant="outlined"
                        fullWidth
                        label="Amount"
                        placeholder="Amount"
                        value={variant.amount}
                        onChange={(event) => valueHandler(event, index)}
                        name="amount"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">INR</InputAdornment>
                          ),
                        }}
                        required
                      />
                      <Cancel
                        fontSize="small"
                        sx={{
                          paddingTop: "10px",
                          paddingLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          variantRemover(index);
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            {formDataValue.variants.length === 0 && (
              <Typography
                variant="subtitle2"
                textAlign={"center"}
                sx={{ marginTop: "20px", marginLeft: "12px" }}
              >
                {" "}
                Please Add Variants
              </Typography>
            )}
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={8} xs={12}>
              <Box>
                <Button variant="text" onClick={addVariant}>
                  Add Variant
                </Button>
              </Box>
              <Box>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <OrderModal modalData={modalData} />
      </Container>
    </>
  );
};

export default UserDashBoard;
