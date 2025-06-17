import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import mineralsData from '../../data';
import { Typography, styled } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const itemsData = mineralsData.slice(3, 6);

const InfoGallery = () => {
    return (
        <Container>
            <Grid container justifyContent="space-around" alignItems="center" spacing={4} sx={{ my: 4 }}>
                {itemsData.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }} textAlign="center">
                        <Box
                            component="img"
                            src={item.img}
                            alt={item.title}
                            sx={{
                                borderRadius: '50%',
                                width: 60,
                                height: 60,
                                mb: 2,
                            }}
                        />
                        <Box component="p" sx={{ m: 0 }}>
                            <StyledTypography>
                                {item.description[0].slice(0, 100) + '...'}
                            </StyledTypography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InfoGallery;