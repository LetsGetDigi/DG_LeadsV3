import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Container, Typography, Grid, Card, Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { useAuth } from '../../pages/AuthContext';


// ----------------------------------------------------------------------

export default function CallSecond() {
    const { token, data, ip } = useAuth();

    const handleButtonClick = (endpoint, enabled) => {
        setOpen(false);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "x-access-token": token },
            body: JSON.stringify({ "_id": data._id, "field": enabled }),
        };

        fetch(`${ip}/api/${endpoint}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/call');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {

        setOpen(false);
        navigate('/call');
    };


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

    const open2 = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Helmet>
                <title> Call Now | DigiLeads </title>
            </Helmet>

            <Container>
                <Typography variant="h4" >
                    Call Now
                </Typography>
            </Container>
            <Container sx={{ width: '70%' }} >
                <Card sx={{ my: 6, py: 2 }} >
                    <Grid>
                        <Grid>
                            <Grid container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                sx={{ pz: 5 }}>
                                <Grid>
                                    <Typography variant='h5' sx={{ px: 1 }}>Phone</Typography>
                                    <DefaultCopyField sx={{ my: 2, pz: 1 }} label="Click on copy Button" value={data.number} />
                                </Grid>
                                <Grid>
                                    <Typography variant='h5' sx={{ px: 1 }}> Webiste URL</Typography>
                                    <DefaultCopyField sx={{ my: 2, pz: 1 }} label="Click on copy Button" value={data.website} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container
                            direction="row"
                            justifyContent="space-around"
                            rowGap={5}
                            alignItems="center"
                            sx={{ py: 3, px: 3 }}>
                            <Button size='large' variant="contained" startIcon={<CheckBoxOutlinedIcon />} onClick={() => handleButtonClick('booked', true)}>
                                Booked
                            </Button>
                            <Button size='large' variant="outlined" startIcon={<NotInterestedOutlinedIcon />} onClick={() => handleButtonClick('interested', false)}>
                                Not Interested
                            </Button>
                            <Button size='large' variant="contained" startIcon={<MarkEmailReadIcon />} onClick={handleClickOpen}>
                                Email
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogContent>
                                    <DialogContentText>
                                        Complete an Email Address to you Contact
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                        onChange={e => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => { handleButtonClick("email", email) }}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            <Button size='large' variant="outlined" startIcon={<PhoneForwardedIcon />} onClick={handleClick}>
                                Call Later
                            </Button>
                            <Popover
                                id={id}
                                open={open2}
                                anchorEl={anchorEl}
                                onClose={handleClose2}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StaticDateTimePicker orientation="landscape" onAccept={(event) => { handleClose2(); handleButtonClick("callLater", new Date(event.$d).toISOString()) }} />
                                </LocalizationProvider>
                            </Popover>
                            <Button size='large' variant="outlined" startIcon={<PhoneForwardedIcon />} onClick={handleClick}>
                                Block Me
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}
