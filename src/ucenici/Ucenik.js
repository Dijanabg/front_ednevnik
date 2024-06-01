import { useLoaderData } from "react-router-dom";
import { Card, CardContent, Typography, Divider } from "@mui/material";

const Ucenik = () => {
  const ucenik = useLoaderData();
  console.log(ucenik);

  return (
    <Card
      sx={{
        width: "60%",
        height: "120%",
        margin: "auto",
        backgroundColor: "#400905",
        color: "white",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Učenik: {ucenik.ime} {ucenik.prezime}
        </Typography>
        <Divider sx={{ borderBottom: "2px solid white", marginBottom: 10 }} />
        <Typography variant="body1" component="div" className="subject-info">
          Email: {ucenik.email}
        </Typography>
        <Typography variant="body1" component="div" className="subject-info">
          Razred: {ucenik.razred}
        </Typography>
        <Typography variant="body1" component="div" className="subject-info">
          Odelenje: {ucenik.odelenje}
        </Typography>
        <Divider sx={{ borderBottom: "2px solid white", marginY: 2 }} />
        <Typography variant="h6" gutterBottom>
          Informacije o roditelju
        </Typography>
        <Typography variant="body1" component="div" className="subject-info">
          Ime: {ucenik.roditelj.ime}
        </Typography>
        <Typography variant="body1" component="div" className="subject-info">
          Prezime: {ucenik.roditelj.prezime}
        </Typography>
        <Typography variant="body1" component="div" className="subject-info">
          Email: {ucenik.roditelj.email}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Ucenik;
