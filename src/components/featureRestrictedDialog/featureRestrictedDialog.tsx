import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface FeatureRestrictedDialogProps {
  open: boolean;
  onClose: () => void;
}

const FeatureRestrictedDialog: React.FC<FeatureRestrictedDialogProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    onClose(); // Close the dialog first
    navigate("/login"); // Then navigate to login page
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Feature Restricted</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This feature is available only for logged-in users. Please log in to
          access this feature.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleLoginRedirect} color="primary">
          Go to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeatureRestrictedDialog;
