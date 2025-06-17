import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

import mineralsData from '../../data';

import InfoGallery from './InfoGallery';

const HoverZoom = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  cursor: 'pointer',

  '& img': {
    transition: 'transform 0.5s ease',
    display: 'block',
    width: '100%',
  },

  '&:hover img': {
    transform: 'scale(1.1)',
  },
}));

const imgData = mineralsData.slice(0, 3);

const Gallery = () => {
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={{ xs: 3, md: 6 }}>
                {imgData.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Link key={ index } to={ "/building/" + index }>
                            <HoverZoom>
                                <img src={item.img} alt={item.title} />
                            </HoverZoom>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            <InfoGallery />
        </Container>
    );
};

export default Gallery;
