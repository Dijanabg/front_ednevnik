import { NavLink, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowUcenik from "./ShowUcenik";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

const ShowUcenici = () => {
  const ucenici = useLoaderData();
  console.log("ShowSubjects - subjects:", ucenici);

  const [search, setSearch] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(ucenici);

  useEffect(() => {
    const filtered = ucenici.filter((ucenik) =>
      ucenik.ime.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [ucenici, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleReset = () => {
    setSearch("");
    setFilteredSubjects(ucenici);
  };
  const handleDeleteSubject = (id) => {
    setFilteredSubjects(filteredSubjects.filter((ucenik) => ucenik.id !== id));
  };
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 3 }}>
        <TextField
          size="small"
          id="outlined-search"
          label="Pretraga po nazivu ucenika"
          type="search"
          value={search}
          onChange={handleSearch}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#400905", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#400905", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#400905", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#c9101c", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#400905", // Label color when focused
            },
            "& .MuiOutlinedInput-input": {
              color: "#400905", // Text color
            },
            "& .MuiInputAdornment-root .MuiIconButton-root:hover": {
              backgroundColor: "transparent", // Background color of the "X" icon button on hover
            },
          }}
        />
        <Button
          variant="outlined"
          className="search-button"
          onClick={handleReset}
          sx={{
            backgroundColor: "#400905",
            color: "white",
            ":hover": {
              backgroundColor: "#bf460b", // Complementary color to #400905
              borderColor: "#bf460b",
            },
          }}
        >
          Reset
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderWidth: 2,
            borderColor: "#400905", // Boja obruba
            color: "#c9101c", // Boja teksta
            "&:hover": {
              borderColor: "#bf460b", // Boja obruba pri prelazu mišem
              backgroundColor: "#bf460b", // Boja pozadine pri prelazu mišem
              color: "white",
            },
          }}
        >
          <NavLink
            to="add_new_ucenik"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Dodaj novi ucenik
          </NavLink>
        </Button>
      </Box>
      <Box>
        <Grid container spacing={3}>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((ucenik) => (
              <ShowUcenik
                key={ucenik.id}
                ucenik={ucenik}
                onDeleteSubject={handleDeleteSubject}
              />
            ))
          ) : (
            <Typography variant="h6">
              Nema ucenika koji odgovaraju pretrazi.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ShowUcenici;
