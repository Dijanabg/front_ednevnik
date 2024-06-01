import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { checkUser } from "../login_logic";

const NewSubject = () => {
  const [name, setName] = useState("");
  const [fond, setFond] = useState("");
  const [razred, setRazred] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [FondErrorText, setFondErrorText] = useState("");
  const [RazredIdErrorText, setRazredIdErrorText] = useState("");

  const addNewSubject = async () => {
    try {
      const user = checkUser([1, 2]);
      const response = await fetch("http://localhost:8080/ednevnik/predmeti", {
        method: "POST",
        headers: {
          Authorization: `Basic ${user.authdata}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nazivPredmeta: name,
          casovaNedeljno: fond,
          razredId: razred,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data, null, 4));
        setShowAlert(true);
        setName("");
        setFond("");
        setRazred("");
      } else {
        console.log("Neuspeh slanja!");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom slanja:", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "80%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ width: "100%", marginBottom: 4 }}
          id="name"
          label="Name"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setShowError(true);
              setNameErrorText("Polje ne može da bude prazno");
            } else {
              setShowError(false);
              setNameErrorText("");
            }
            setName(value);
          }}
          required
          error={showError}
          helperText={nameErrorText}
        />
        <TextField
          sx={{ width: "100%", marginBottom: 4 }}
          id="razred"
          label="Razred"
          variant="outlined"
          type="number"
          value={razred}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 1 || value > 8) {
              setShowError(true);
              setRazredIdErrorText(
                "Broj razreda ne sme da bude manji od 1 i veći od 8"
              );
            } else {
              setShowError(false);
              setRazredIdErrorText("");
            }
            setRazred(value);
          }}
          required
          error={showError}
          helperText={RazredIdErrorText}
        />
        <TextField
          sx={{ width: "100%", marginBottom: 4 }}
          id="fond"
          label="Nedeljni fond casova"
          variant="outlined"
          type="number"
          value={fond}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 0 || value > 10) {
              setShowError(true);
              setFondErrorText(
                "Broj časova ne sme da bude manje od 0 i veće od 10"
              );
            } else {
              setShowError(false);
              setFondErrorText("");
            }
            setFond(value);
          }}
          required
          error={showError}
          helperText={FondErrorText}
        />
        {showAlert && (
          <Alert
            sx={{ width: "100%", marginBottom: 4 }}
            onClose={() => {
              setShowAlert(false);
            }}
          >
            Uspešno dodat novi predmet!
          </Alert>
        )}

        <Button
          variant="outlined"
          className="save_button"
          onClick={addNewSubject}
          disabled={showError}
          sx={{
            borderWidth: 2,
            borderColor: "#400905", // Boja obruba
            color: "#c9101c",
            marginLeft: 3,
            px: 10,
            fontWeight: 900, // Boja teksta
            "&:hover": {
              borderColor: "#bf460b", // Boja obruba pri prelazu mišem
              backgroundColor: "#bf460b", // Boja pozadine pri prelazu mišem
              color: "white",
            },
          }}
        >
          Sačuvaj
        </Button>
      </Box>
    </Container>
  );
};

export default NewSubject;
