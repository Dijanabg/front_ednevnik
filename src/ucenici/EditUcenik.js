import { Button, TextField, Box, Container } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { checkUser } from "../login_logic";

const EditUcenik = () => {
  const ucenik = useLoaderData();
  const [name, setName] = useState(ucenik.ime); // Ispravljeno ime atributa
  const [prezime, setPrezime] = useState(ucenik.prezime); // Ispravljeno ime atributa
  const [email, setEmail] = useState(ucenik.email); // Ispravljeno ime atributa

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
            prezime: prezime,
            email: email, // Ispravljeno ime atributa
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
          id="prezime"
          label="Prezime"
          variant="outlined"
          type="text"
          value={prezime}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setShowError(true);
              setHelperText("Polje ne može da bude prazno");
            } else {
              setShowError(false);
              setHelperText("");
            }
            setPrezime(value);
          }}
          required
          error={showError}
          helperText={helperText2}
        />
        <TextField
          sx={{ width: "80%", marginBottom: 4 }}
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            if (!validateEmail(value)) {
              setShowError(true);
              setHelperText2("Unesite validnu email adresu");
            } else {
              setShowError(false);
              setHelperText("");
            }
            setEmail(value);
          }}
          required
          error={showError}
          helperText={helperText}
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
