import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, Button } from '@mui/material';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import CallIcon from '@mui/icons-material/Call';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { Icon } from '@iconify/react';
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
                <Container sx={{ display: "flex", justifyContent: 'center', gap: 5 }}>
                    <Link to={{ pathname: '/callf', }} style={{ textDecoration: 'none', color: "primary" }}>
                        <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                            <CallIcon color='primary' fontSize='large' />
                            <Typography variant='h6' color={"black"} >Call Now </Typography>
                        </Card>
                    </Link>
                    {data.uses_wordpress === "y" &&
                        <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={data.website} >
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <Icon icon="uil:wordpress" style={{ color: '#2065d1', fontSize: '37px' }} />
                                <Typography variant='h6' color={"black"} >Wordpress </Typography>
                            </Card>
                        </Link>

                    }
                    {data.uses_shopify === "y" &&

                        <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                            <Icon icon="logos:shopify" style={{ color: '#2065d1', fontSize: '40px' }} />
                            <Typography variant='h6' color={"black"} >Shopify </Typography>
                        </Card>
                    }
                    {data.instagram !== "" &&
                        <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={data.instagram} >
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <InstagramIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Instagram </Typography>
                            </Card>
                        </Link>
                    }
                    {data.facebook !== "" &&
                        <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={data.facebook} >
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <FacebookIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Facebook </Typography>
                            </Card>
                        </Link>
                    }
                    {data.twitter !== "" &&
                        <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={data.twitter} >
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <TwitterIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Twitter </Typography>
                            </Card>
                        </Link>
                    }
                    {data.linkedin !== "" &&
                        <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={data.linkedin} >
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <LinkedInIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >LinkedIn </Typography>
                            </Card>
                        </Link>
                    }
                </Container>
                <Container sx={{ display: "flex", justifyContent: 'center', gap: 5 }}>
                    {data.ads_adwords !== "" &&
                        <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                            <GoogleIcon color='primary' fontSize='large' />
                            <Typography variant='h6' color={"black"} >Google Ads </Typography>
                        </Card>
                    }
                    {data.ads_facebook !== "" &&
                        <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                            <FacebookIcon color='primary' fontSize='large' />
                            <Typography variant='h6' color={"black"} >Facebook Ads </Typography>
                        </Card>
                    }
                    {data.ads_instagram !== "" &&
                        <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                            <InstagramIcon color='primary' fontSize='large' />
                            <Typography variant='h6' color={"black"} >Instagram Ads </Typography>
                        </Card>
                    }
                </Container>
            </Container>
        </>
    );
}
