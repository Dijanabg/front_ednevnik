import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Modal({ onCloseModal }) {
  // Uklonjen nepotreban state za praćenje otvorenosti moda
  // const [open, setOpen] = useState(false);

  // Nepotrebna funkcija handleClickOpen je uklonjena

  const handleClose = (deleteSubject) => {
    onCloseModal(deleteSubject); // Prosleđuje se stanje brisanja natrag roditeljskoj komponenti
  };

  return (
    <Dialog
      open={true} // Postavljeno na true kako bi modal uvek bio vidljiv kada se koristi
      onClose={() => {
        handleClose(false); // Zatvara modal bez brisanja ako se klikne van moda
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete subject"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Da li ste sigurni da zelite da izbrisete predmet?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose(true); // Poziva roditeljsku funkciju za brisanje sa vrednošću true
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            handleClose(false); // Poziva roditeljsku funkciju za zatvaranje moda sa vrednošću false
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
