import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { checkUser } from "../login_logic";

const EditSubject = () => {
  const predmet = useLoaderData();
  const [name, setName] = useState(predmet.nazivPredmeta); // Ispravljeno ime atributa
  const [razred, setRazred] = useState(predmet.razredId); // Ispravljeno ime atributa
  const [fond, setfond] = useState(predmet.fond); // Ispravljeno ime atributa

  const [showError, setShowError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [helperText2, setHelperText2] = useState("");

  const submitForm = async () => {
    try {
      const user = checkUser([1, 2]);
      const response = await fetch(
        `http://localhost:8080/ednevnik/predmeti/${predmet.id}`, // Ispravljen URL i ime atributa
        {
          method: "PUT",
          headers: {
            Authorization: `Basic ${user.authdata}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nazivPredmeta: name, // Ispravljeno ime atributa
            razredId: razred,
            casovaNedeljno: fond, // Ispravljeno ime atributa
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
    <div className="form_container">
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
            setHelperText2("Broj časova ne sme da bude manji od 1 i veći od 8");
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
        id="fond"
        label="Nedeljni fond casova"
        variant="outlined"
        type="number"
        value={fond}
        onChange={(e) => {
          const value = e.target.value;
          if (value < 0 || value > 10) {
            setShowError(true);
            setHelperText2(
              "Broj časova ne sme da bude manji od 0 i veći od 10"
            );
          } else {
            setShowError(false);
            setHelperText2("");
          }
          setfond(value);
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
    </div>
  );
};

export default EditSubject;
