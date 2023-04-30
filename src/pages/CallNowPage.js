import { Helmet } from 'react-helmet-async';
import CallIcon from '@mui/icons-material/Call';
import { Container, Typography, Card, Button, TextField, Grid } from '@mui/material';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { Icon } from '@iconify/react';
import { useAuth } from './AuthContext';


export default function CalNowPage() {
    const [currentData, setCurrentData] = useState({ phone: "", website: "", _id: "", name: "", instagram_followers: "", email: "", category: "", address: "", city: "", uses_wordpress: "", uses_shopify: "", facebook: "", instagram: "", twitter: "", linkedin: "", ads_facebook: "", ads_instagram: "", ads_messenger: "", ads_adwords: "", yelpstars: "", yelpreviewscount: "", facebookstars: "", facebookreviewscount: "", instagram_media_count: "", instagram_highlight_reel_count: "", instagram_average_likes: "", instagram_average_comments: "", });
    const { token, setData, ip } = useAuth();

    useEffect(() => {
        fetch(`${ip}/api/data`, {
            headers: {
                'x-access-token': token,
            },
            method: "GET",
        })
            .then((response) => response.json())
            .then((currentData) => {
                setData(currentData);
                setCurrentData(currentData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Helmet>
                <title> Call Now | DigiLeads </title>
            </Helmet>

            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Call Now
                </Typography>
                <Grid sx={{ display: 'grid', gap: 5 }}>
                    <Card sx={{ width: "100%", display: 'flex', flexDirection: 'row', py: 3, alignItems: 'center', alignSelf: 'middle' }}>
                        <Container sx={{ width: "50%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {currentData.name !== "" && <><Typography variant='h5' > Name </Typography>
                                <DefaultCopyField sx={{ my: 3 }} value={currentData.name} /></>}
                            {currentData.email !== "" && <>
                                <Typography variant='h5' >Email</Typography>
                                <DefaultCopyField sx={{ my: 3 }} value={currentData.email} /></>}
                            {currentData.website !== "" && <>
                                <Typography variant='h5'> Phone </Typography>
                                <DefaultCopyField sx={{ my: 3 }} value={currentData.phone} /></>}
                        </Container>
                        <Container sx={{ width: "50%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {currentData.category !== "" && <><Typography variant='h5' > Category </Typography>
                                <DefaultCopyField sx={{ width: "fit-content", my: 3 }} value={currentData.category} /></>}
                            {currentData.email !== "" && <>
                                <Typography variant='h5' >Website</Typography>
                                <DefaultCopyField sx={{ my: 3 }} value={currentData.website} /></>}
                            {currentData.website !== "" && <>
                                <Typography variant='h5'> Address </Typography>
                                <DefaultCopyField sx={{ my: 3 }} value={currentData.address} /></>}
                        </Container>
                    </Card>
                    <Container sx={{ display: "flex", justifyContent: 'center', gap: 5 }}>
                        <Link to={{ pathname: '/callf', }} style={{ textDecoration: 'none', color: "primary" }}>
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <CallIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Call Now </Typography>
                            </Card>
                        </Link>
                        {currentData.uses_wordpress === "y" &&
                            <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={currentData.website} >
                                <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                    <Icon icon="uil:wordpress" style={{ color: '#2065d1', fontSize: '37px' }} />
                                    <Typography variant='h6' color={"black"} >Wordpress </Typography>
                                </Card>
                            </Link>

                        }
                        {currentData.uses_shopify === "y" &&

                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <Icon icon="logos:shopify" style={{ color: '#2065d1', fontSize: '40px' }} />
                                <Typography variant='h6' color={"black"} >Shopify </Typography>
                            </Card>
                        }
                        {currentData.instagram !== "" &&
                            <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={currentData.instagram} >
                                <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                    <InstagramIcon color='primary' fontSize='large' />
                                    <Typography variant='h6' color={"black"} >Instagram </Typography>
                                </Card>
                            </Link>
                        }
                        {currentData.facebook !== "" &&
                            <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={currentData.facebook} >
                                <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                    <FacebookIcon color='primary' fontSize='large' />
                                    <Typography variant='h6' color={"black"} >Facebook </Typography>
                                </Card>
                            </Link>
                        }
                        {currentData.twitter !== "" &&
                            <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={currentData.twitter} >
                                <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                    <TwitterIcon color='primary' fontSize='large' />
                                    <Typography variant='h6' color={"black"} >Twitter </Typography>
                                </Card>
                            </Link>
                        }
                        {currentData.linkedin !== "" &&
                            <Link style={{ textDecoration: 'none', color: "black" }} target='_blank' to={currentData.linkedin} >
                                <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                    <LinkedInIcon color='primary' fontSize='large' />
                                    <Typography variant='h6' color={"black"} >LinkedIn </Typography>
                                </Card>
                            </Link>
                        }
                    </Container>
                    <Container sx={{ display: "flex", justifyContent: 'center', gap: 5 }}>
                        {currentData.ads_adwords !== "" &&
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <GoogleIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Google Ads </Typography>
                            </Card>
                        }
                        {currentData.ads_facebook !== "" &&
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <FacebookIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Facebook Ads </Typography>
                            </Card>
                        }
                        {currentData.ads_instagram !== "" &&
                            <Card sx={{ width: "fit-content", p: 3, textAlign: 'center', }}>
                                <InstagramIcon color='primary' fontSize='large' />
                                <Typography variant='h6' color={"black"} >Instagram Ads </Typography>
                            </Card>
                        }
                    </Container>
                </Grid>
            </Container >

        </>
    );
}


