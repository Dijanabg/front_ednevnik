import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

const LoginModal = ({ show, handleCloseModal }) => {
  const [open, setOpen] = useState(show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setOpen(false);
    handleCloseModal(); //f-ja koja se nalazi u roditelju odnosno u APP komponenti, promenicemo stanje da se modal ne prikazuje
  };

  const loginUser = async () => {
    const credentials = btoa(`${username}:${password}`);
    try {
      const response = await fetch("http://localhost:8080/ednevnik/login", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({
            korisnickoIme: userData.korisnickoIme,
            ime: userData.ime || "", // Ako ne postoji, postavite praznu vrednost
            prezime: userData.prezime || "", // Ako ne postoji, postavite praznu vrednost
            email: userData.email || "",
            rola_id: userData.rolaId, // Čuvajte rolaId umesto role
            authdata: credentials,
          })
        );
        closeModal();
      } else {
        setErrorMessage("Wrong username or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "10px",
          }}
        >
          <TextField
            required
            placeholder="Username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "100%" }}
          />

          <TextField
            required
            placeholder="Password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%" }}
            type="password"
          />

          <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={loginUser}>Login</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
