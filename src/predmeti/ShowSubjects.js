import {
  // NavLink,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import ShowSubject from "./ShowSubject";
import "./ShowSubjects.css";

// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Typography,
//   TextField,
// } from "@mui/material";

const ShowSubjects = () => {
  const predmeti = useLoaderData();
  console.log("ShowSubjects - subjects:", predmeti);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(predmeti);

  useEffect(() => {
    const filtered = predmeti.filter((predmet) =>
      predmet.nazivPredmeta.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [predmeti, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleReset = () => {
    setSearch("");
    setFilteredSubjects(predmeti);
  };
  const handleDeleteSubject = (id) => {
    setFilteredSubjects(
      filteredSubjects.filter((predmet) => predmet.id !== id)
    );
  };
  // return (
  //   <Container>
  //     <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 3 }}>
  //       <TextField
  //         size="small"
  //         id="outlined-search"
  //         label="Pretraga po nazivu predmeta"
  //         type="search"
  //         value={search}
  //         onChange={handleSearch}
  //         sx={{
  //           "& .MuiOutlinedInput-root": {
  //             "& fieldset": {
  //               borderColor: "#400905", // Default border color
  //             },
  //             "&:hover fieldset": {
  //               borderColor: "#400905", // Border color on hover
  //             },
  //             "&.Mui-focused fieldset": {
  //               borderColor: "#400905", // Border color when focused
  //             },
  //           },
  //           "& .MuiInputLabel-root": {
  //             color: "#c9101c", // Default label color
  //           },
  //           "& .MuiInputLabel-root.Mui-focused": {
  //             color: "#400905", // Label color when focused
  //           },
  //           "& .MuiOutlinedInput-input": {
  //             color: "#400905", // Text color
  //           },
  //           "& .MuiInputAdornment-root .MuiIconButton-root:hover": {
  //             backgroundColor: "transparent", // Background color of the "X" icon button on hover
  //           },
  //         }}
  //       />
  //       <Button
  //         variant="outlined"
  //         className="search-button"
  //         onClick={handleReset}
  //         sx={{
  //           backgroundColor: "#400905",
  //           color: "white",
  //           ":hover": {
  //             backgroundColor: "#bf460b", // Complementary color to #400905
  //             borderColor: "#bf460b",
  //           },
  //         }}
  //       >
  //         Reset
  //       </Button>

  //       <Button
  //         variant="outlined"
  //         sx={{
  //           borderWidth: 2,
  //           borderColor: "#400905", // Boja obruba
  //           color: "#c9101c", // Boja teksta
  //           "&:hover": {
  //             borderColor: "#bf460b", // Boja obruba pri prelazu mišem
  //             backgroundColor: "#bf460b", // Boja pozadine pri prelazu mišem
  //             color: "white",
  //           },
  //         }}
  //       >
  //         <NavLink
  //           to="add_new_subject"
  //           style={{ color: "inherit", textDecoration: "none" }}
  //         >
  //           Dodaj novi predmet
  //         </NavLink>
  //       </Button>
  //     </Box>
  //     <Box>
  //       <Grid container spacing={3}>
  //         {filteredSubjects.length > 0 ? (
  //           filteredSubjects.map((predmet) => (
  //             <ShowSubject
  //               key={predmet.id}
  //               predmet={predmet}
  //               onDeleteSubject={handleDeleteSubject}
  //             />
  //           ))
  //         ) : (
  //           <Typography variant="h6">
  //             Nema predmeta koji odgovaraju pretrazi.
  //           </Typography>
  //         )}
  //       </Grid>
  //     </Box>
  //   </Container>
  // );

  return (
    <div className="subject_container">
      <header className="subject_container_header">
        <div className="subject_input-container">
          <input
            className="subject_input-field"
            type="text"
            placeholder="Pretraži predmete..."
            value={search}
            onChange={handleSearch}
          />
          <button className="subject_search_button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <button
          className="add_btn"
          onClick={() => {
            navigate("add_new_subject");
          }}
        >
          Dodaj novi predmet
        </button>
      </header>
      <div className="container_show_subjects">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((predmet) => (
            <ShowSubject
              key={predmet.id}
              predmet={predmet}
              onDeleteSubject={handleDeleteSubject}
            />
          ))
        ) : (
          <p>Nema predmeta koji odgovaraju pretrazi.</p>
        )}
      </div>
    </div>
  );
};

export default ShowSubjects;
