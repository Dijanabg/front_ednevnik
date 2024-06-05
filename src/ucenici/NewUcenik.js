import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { checkUser } from "../login_logic";

const NewUcenik = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [korisnikId, setKorisnikId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [imeErrorText, setNameErrorText] = useState("");
  const [korisnikIdErrorText, setKorisnikIdErrorText] = useState("");

  const addNewUcenik = async () => {
    try {
      const user = checkUser([1, 2]);
      const response = await fetch("http://localhost:8080/ednevnik/ucenici", {
        method: "POST",
        headers: {
          Authorization: `Basic ${user.authdata}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ime: ime,
          prezime: prezime,
          email: email,
          korisnikId: korisnikId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data, null, 4));
        setShowAlert(true);
        setIme("");
        setPrezime("");
        setEmail("");
        setKorisnikId("");
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
          value={ime}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setShowError(true);
              setNameErrorText("Polje ne može da bude prazno");
            } else {
              setShowError(false);
              setNameErrorText("");
            }
            setIme(value);
          }}
          required
          error={showError}
          helperText={imeErrorText}
        />
        <TextField
          sx={{ width: "100%", marginBottom: 4 }}
          id="prezime"
          label="Prezime"
          variant="outlined"
          type="text"
          value={prezime}
          onChange={(e) => setPrezime(e.target.value)}
          required
        />
        <TextField
          sx={{ width: "100%", marginBottom: 4 }}
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          sx={{ width: "100%", marginBottom: 4 }}
          id="korisnikId"
          label="Korisnik ID"
          variant="outlined"
          type="number"
          value={korisnikId}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || value < 1) {
              setShowError(true);
              setKorisnikIdErrorText(
                "Polje ne može da bude prazno i mora biti veće od 0"
              );
            } else {
              setShowError(false);
              setKorisnikIdErrorText("");
            }
            setKorisnikId(value);
          }}
          required
          error={showError}
          helperText={korisnikIdErrorText}
        />
        {showAlert && (
          <Alert
            sx={{ width: "100%", marginBottom: 4 }}
            onClose={() => {
              setShowAlert(false);
            }}
          >
            Uspešno dodat novi ucenik!
          </Alert>
        )}

        <Button
          variant="outlined"
          className="save_button"
          onClick={addNewUcenik}
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

export default NewUcenik;
