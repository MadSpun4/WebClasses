import structures from '../data';
import NavBar from '../components/Navbar';
import { useParams, Link } from 'react-router-dom';

import { Container, Typography, Box, styled, Breadcrumbs } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(2),
}));

const Building = () => {
    const { id } = useParams();
    const idx = parseInt(id!, 10);

    const building = structures[idx];

    return (
        <div>
            <NavBar active=''/>

            <Container
                sx={{
                    mt: 2,
                    mb: 1,
                }}
            >
                <Breadcrumbs
                    separator="›"
                    aria-label="breadcrumb"
                >
                    <Link
                        to="/"
                    >
                        <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                            Главная
                        </Typography>
                    </Link>
                    <Typography variant="h6">
                        {building.title}
                    </Typography>
                </Breadcrumbs>
            </Container>

            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <StyledTypography variant="h3" gutterBottom>
                    {building.title}
                </StyledTypography>

                <Box
                    component="img"
                    src={building.img}
                    alt={building.title}
                    sx={{ width: '100%', maxWidth: 500, maxHeight: 500, mb: 3 }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                        gap: 4,
                    }}
                >
                    {building.description.map((paragraph) => (
                        <Typography>
                            {paragraph}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </div>
    )
}

export default Building;