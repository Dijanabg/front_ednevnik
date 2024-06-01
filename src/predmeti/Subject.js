import { useLoaderData } from "react-router-dom";
// import { Card, CardContent, Typography, Divider } from "@mui/material";
import "./ShowSubjects.css";

const Subject = () => {
  const predmet = useLoaderData();
  console.log(predmet);

  return (
    <div className="subject-overviewcard">
      <div className="subject-name-container">
        <p className="subject-name"> {predmet.nazivPredmeta}</p>
        <hr />
      </div>
      <div>
        <div className="subject-info">ID: {predmet.id}</div>
        <div className="subject-info">Razred: {predmet.razredId}</div>

        <div className="subject-info">
          Fond časova: {predmet.casovaNedeljno}
        </div>
      </div>
    </div>
  );
};

// <Card
//   sx={{
//     width: "60%",
//     height: "120%",
//     margin: "auto",
//     backgroundColor: "#400905",
//     color: "white",
//     textAlign: "center",
//   }}
// >
//   <CardContent>
//     <Typography variant="h6" gutterBottom>
//       Naziv: {predmet.nazivPredmeta}
//     </Typography>
//     <Divider sx={{ borderBottom: "2px solid white", marginBottom: 10 }} />
//     <Typography variant="body1" component="div" className="subject-info">
//       ID: {predmet.id}
//     </Typography>
//     <Typography variant="body1" component="div" className="subject-info">
//       Razred: {predmet.razredId}
//     </Typography>
//     <Typography variant="body1" component="div" className="subject-info">
//       Nedeljni fond časova: {predmet.casovaNedeljno}
//     </Typography>
//   </CardContent>
// </Card>
// };
export default Subject;
