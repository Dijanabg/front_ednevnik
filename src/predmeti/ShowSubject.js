// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardActions,
//   Grid,
//   Typography,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaEdit, FaTrashAlt } from "react-icons/fa"; // Uvoz Font Awesome ikona

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import InfoIcon from "@mui/icons-material/Info";
// import CardMedia from "@mui/material/CardMedia";
import { checkUser } from "../login_logic";

const ShowSubject = ({ predmet, onDeleteSubject }) => {
  console.log(predmet);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const user = checkUser([1, 2]);
      const result = await fetch(
        `http://localhost:8080/ednevnik/predmeti/${predmet.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${user.authdata}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.ok) {
        console.log("Predmet uspešno obrisan.");
        onDeleteSubject(predmet.id); // Ažurirajte listu predmeta
      } else {
        console.log("Brisanje nije uspelo");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom brisanja:", error);
    }
  };
  return (
    <div className="card">
      <div className="kartica">
        <p className="text"> {predmet.nazivPredmeta}</p>
        <img
          className="slika-predmeta"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg"
          alt="slika"
        />
        <p className="text">Razred: {predmet.razredId}</p>
        <div className="actions">
          <button onClick={() => navigate(`findById/${predmet.id}`)}>
            <FaInfoCircle />
          </button>
          <button onClick={() => navigate(`update/${predmet.id}`)}>
            <FaEdit />
          </button>
          <button onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <Grid item xs={12} md={4}>
  //       <Card
  //         sx={{ marginBottom: 3, backgroundColor: "#400905" }}
  //         variant="outlined"
  //       >
  //         <CardHeader
  //           sx={{ display: "flex", color: "white", textAlign: "center" }}
  //           title={predmet.nazivPredmeta}
  //         />
  //         <CardMedia
  //           sx={{ height: 140 }}
  //           image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/640px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg"
  //           title={predmet.nazivPredmeta}
  //         />
  //         <CardContent
  //           sx={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Grid
  //             container
  //             spacing={3}
  //             alignItems="center"
  //             justifyContent="space-between"
  //             sx={{ padding: "5px" }}
  //           >
  //             <Grid item xs={6}>
  //               <Typography color="white">Razred</Typography>{" "}
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Typography color="white">{predmet.razredId}</Typography>{" "}
  //             </Grid>
  //           </Grid>
  //         </CardContent>

  //         <CardActions sx={{ display: "flex", justifyContent: "center" }}>
  //           <Tooltip title="Info">
  //             <IconButton
  //               aria-label="info"
  //               onClick={() => navigate(`findById/${predmet.id}`)}
  //               sx={{ color: "white" }}
  //             >
  //               <InfoIcon />
  //             </IconButton>
  //           </Tooltip>

  //           <Tooltip title="Edit">
  //             <IconButton
  //               aria-label="edit"
  //               onClick={() => navigate(`update/${predmet.id}`)}
  //               sx={{ color: "white" }}
  //             >
  //               <EditIcon />
  //             </IconButton>
  //           </Tooltip>

  //           <Tooltip title="Delete">
  //             <IconButton
  //               aria-label="delete"
  //               onClick={handleDelete}
  //               sx={{ color: "white" }}
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           </Tooltip>
  //         </CardActions>
  //       </Card>
  //     </Grid>
  //   );
};

export default ShowSubject;
