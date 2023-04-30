import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, Button } from '@mui/material';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import CallIcon from '@mui/icons-material/Call';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useAuth } from '../../pages/AuthContext';

export default function CallFirst() {
    const { token, data, ip } = useAuth();
    const handleButtonClick = (endpoint, enabled) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "x-access-token": token },
            body: JSON.stringify({ "_id": data._id, "field": enabled }),
        };

        fetch(`${ip}/api/${endpoint}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

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
                                    <DefaultCopyField sx={{ my: 2, pz: 1 }} label="Click on copy Button" value={data.phone} />
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
                            <Link to='/calls' style={{ textDecoration: 'none' }}>
                                <Button size='large' variant="contained" startIcon={<CallIcon />} onClick={() => handleButtonClick('answered', true)}>
                                    Answered
                                </Button>
                            </Link>
                            <Link to='/call' style={{ textDecoration: 'none' }}>
                                <Button size='large' variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={() => handleButtonClick('delete', true)}>
                                    Wrong Number
                                </Button>
                            </Link>
                            <Link to='/call' style={{ textDecoration: 'none' }}>
                                <Button size='large' variant="contained" startIcon={<VoicemailIcon />} onClick={() => handleButtonClick('voicemail', true)}>
                                    Voice Mail
                                </Button>
                            </Link>
                            <Link to='/call' style={{ textDecoration: 'none' }}>
                                <Button size='large' variant="outlined" startIcon={<NoAccountsIcon />} onClick={() => handleButtonClick('answered', false)}>
                                    No Answer
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}
