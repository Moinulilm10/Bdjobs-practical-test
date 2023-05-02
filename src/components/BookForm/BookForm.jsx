// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import "./BookForm.css";
import { Typography } from "@mui/material";

const BookAddForm = () => {
  const { register, handleSubmit, reset, watch, control } = useForm();

  const ageValue = watch("age") || "";

  const onSubmit = (data) => {
    const url = `http://localhost:5000`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Book added successfully");
          reset();
        }
      });
  };

  return (
    <div className="add-service mt-4">
      <Typography
        style={{
          alignItems: "center",
          marginLeft: "650px",
        }}
        sx={{ color: "#272727", fontWeight: "bold" }}
        variant="h4"
        gutterBottom
        component="div"
      >
        Add Book
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Book Name"
          variant="outlined"
          margin="large"
          {...register("bookName", { required: true })}
        />
        <TextField
          label="Publisher Name"
          variant="outlined"
          margin="normal"
          {...register("publisherName", { required: true })}
        />
        <TextField
          label="Age"
          variant="outlined"
          margin="normal"
          {...register("age", { required: true })}
        />
        <Controller
          name="age"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              label="Age"
              variant="outlined"
              margin="normal"
              value={ageValue}
              onChange={(event) => field.onChange(event.target.value)}
            >
              <MenuItem value="">Select Age</MenuItem>
              <MenuItem value="0-5">0-5</MenuItem>
              <MenuItem value="6-10">6-10</MenuItem>
              <MenuItem value="11-15">11-15</MenuItem>
              <MenuItem value="16+">16+</MenuItem>
            </Select>
          )}
        />
        <input
          type="date"
          {...register("date", { required: true })}
          placeholder="date"
        />
        <TextField
          label="Page"
          variant="outlined"
          margin="normal"
          {...register("page", { required: true })}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Book
        </Button>
      </form>
    </div>
  );
};

export default BookAddForm;
