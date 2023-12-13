import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import { useAuth } from "../../context/authContext";
import {
    deleteUser as deleteUserThunk,
    fetchUserById,
  } from "../../thunks/userThunks";
import { useNavigate } from "react-router-dom";

const AccountField: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const handleUpdateClick = () => setShowAccountDialog(true);
  const handleCancelClick = () => setShowAccountDialog(false);


  const {
    currentUser,
    deleteUser,
    reAuthenticate,
    updateUserPassword,
    updateUserEmail,
  } = useAuth();
  const username = "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchUserById(currentUser.uid));
    }
  }, [currentUser, dispatch]);


  const [showReAuthDialog, setShowReAuthDialog] = useState(false);
  const handleReAuthenticate = async () => {
    try {
      await reAuthenticate(email, password);
      setShowReAuthDialog(false);
    } catch (error) {
      console.error("Re-authentication failed: ", error);
    }
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleDeleteDialogOpen = () => setShowDeleteDialog(true);
  const handleDeleteDialogClose = () => setShowDeleteDialog(false);
  const handleConfirmDelete = async () => {
    try {
      if (!currentUser?.uid) {
        throw new Error("User ID is not available");
      }
      deleteUser();
      await dispatch(deleteUserThunk(currentUser.uid));
      alert("Account deleted");
      handleDeleteDialogClose();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleProfileUpdate = async () => {
    if (validate()) {
      try {
        await updateUserEmail(email);
        alert(
          "A verification email has been sent to your new email address. Please verify to complete the update."
        );
        await updateUserPassword(password);
        alert("Account updated successfully");
      } catch (error: any) {
        if (error.code === "auth/requires-recent-login") {
          setShowReAuthDialog(true);
        } else {
          console.error("Error updating account: ", error);
          alert("Error updating account");
        }
      }
    }
  };

  return <Container className="accountContainer">
     <Button variant="contained" onClick={handleUpdateClick}>
        Update Account
      </Button>

      <Dialog
        open={showAccountDialog}
        onClose={handleCancelClick}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle align="right">
          <IconButton className="closeButton" onClick={handleCancelClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField label="name" fullWidth margin="dense" value={username} />
          <TextField
            value={currentUser?.email || ""}
            type="email"
            label="email"
            fullWidth
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="password"
            fullWidth
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="repeat password"
            fullWidth
            margin="dense"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleProfileUpdate}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
          <Button
            onClick={handleDeleteDialogOpen}
            color="warning"
            variant="outlined"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showReAuthDialog}
        onClose={() => setShowReAuthDialog(false)}
      >
        <DialogTitle>Re-authenticate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your credentials to update your account settings.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReAuthDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReAuthenticate} color="primary">
            Re-authenticate
          </Button>
        </DialogActions>
      </Dialog>
    </Container>;
};

export default AccountField;
