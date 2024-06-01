import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CardMedia from "@mui/material/CardMedia";
import { checkUser } from "../login_logic";

const ShowSubject = ({ ucenik, onDeleteSubject }) => {
  console.log(ucenik);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const user = checkUser([1, 2, 3, 4]);
      const result = await fetch(
        `http://localhost:8080/ednevnik/ucenici/${ucenik.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${user.authdata}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.ok) {
        console.log("ucenik uspešno obrisan.");
        onDeleteSubject(ucenik.id); // Ažurirajte listu ucenika
      } else {
        console.log("Brisanje nije uspelo");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom brisanja:", error);
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{ marginBottom: 3, backgroundColor: "#400905" }}
        variant="outlined"
      >
        <CardHeader
          sx={{ display: "flex", color: "white", textAlign: "center" }}
          title={`${ucenik.ime} ${ucenik.prezime}`}
        />
        <CardMedia
          sx={{ height: 140 }}
          image="https://i.pravatar.cc/300/300?random"
          title={ucenik.nazivucenika}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            sx={{ padding: "5px" }}
          >
            <Grid item xs={6}>
              <Typography color="white">Ime</Typography>{" "}
            </Grid>
            <Grid item xs={6}>
              <Typography color="white">{ucenik.ime}</Typography>{" "}
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Info">
            <IconButton
              aria-label="info"
              onClick={() => navigate(`findById/${ucenik.id}`)}
              sx={{ color: "white" }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              onClick={() => navigate(`update/${ucenik.id}`)}
              sx={{ color: "white" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={handleDelete}
              sx={{ color: "white" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ShowSubject;
