import { Button, TextField, Box, Container } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { checkUser } from "../login_logic";

const EditUcenik = () => {
  const ucenik = useLoaderData();
  const [name, setName] = useState(ucenik.ime); // Ispravljeno ime atributa
  const [razred, setRazred] = useState(ucenik.razred); // Ispravljeno ime atributa
  const [odelenje, setOdelenje] = useState(ucenik.odelenje); // Ispravljeno ime atributa

  const [showError, setShowError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [helperText2, setHelperText2] = useState("");

  const submitForm = async () => {
    try {
      const user = checkUser([1, 2]);
      const response = await fetch(
        `http://localhost:8080/ednevnik/ucenici/${ucenik.id}`, // Ispravljen URL i ime atributa
        {
          method: "PUT",
          headers: {
            Authorization: `Basic ${user.authdata}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ime: name, // Ispravljeno ime atributa
            razred: razred,
            odelenje: odelenje, // Ispravljeno ime atributa
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data, null, 4));
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
          sx={{ width: "80%", marginBottom: 4 }}
          id="name"
          label="Naziv Predmeta"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setShowError(true);
              setHelperText("Polje ne može da bude prazno");
            } else {
              setShowError(false);
              setHelperText("");
            }
            setName(value);
          }}
          required
          error={showError}
          helperText={helperText}
        />
        <TextField
          sx={{ width: "80%", marginBottom: 4 }}
          id="fond"
          label="Razred"
          variant="outlined"
          type="number"
          value={razred}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 1 || value > 8) {
              setShowError(true);
              setHelperText2(
                "Broj časova ne sme da bude manji od 1 i veći od 8"
              );
            } else {
              setShowError(false);
              setHelperText2("");
            }
            setRazred(value);
          }}
          required
          error={showError}
          helperText={helperText2}
        />
        <TextField
          sx={{ width: "80%", marginBottom: 4 }}
          id="odelenje"
          label="Odelenje"
          variant="outlined"
          type="number"
          value={odelenje}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 1 || value > 10) {
              setShowError(true);
              setHelperText2(
                "Broj odelenja ne sme da bude manji od 1 i veći od 10"
              );
            } else {
              setShowError(false);
              setHelperText2("");
            }
            setOdelenje(value);
          }}
          required
          error={showError}
          helperText={helperText2}
        />
        <Button
          variant="outlined"
          className="save_button"
          onClick={submitForm}
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
          Ažuriraj
        </Button>
      </Box>
    </Container>
  );
};

export default EditUcenik;
