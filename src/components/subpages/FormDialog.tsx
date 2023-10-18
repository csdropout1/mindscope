import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  DialogActions,
  Button
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const FormDialog = ({
  title,
  open,
  handleClose,
  formId
}: {
  title: string;
  open: boolean;
  handleClose: () => void;
  formId: string;
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>Send this form to your patient:</Typography>
        {/* <Typography>{formId}</Typography> */}
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Copy to clipboard
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={formId}
            readOnly
            fullWidth
            role="textbox"
            sx={{
              width: '500px'
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(formId);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
