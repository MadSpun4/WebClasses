import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import emerald from '../images/emerald.jpg';
import gas from '../images/gas.jpg';
import gold from '../images/gold.jpg';

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

const Gallery = () => {
    const images = [
        { src: emerald, alt: 'emerald' },
        { src: gas, alt: 'gas' },
        { src: gold, alt: 'gold' },
    ];

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={{ xs: 3, md: 6 }}>
                {images.map((image, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <HoverZoom>
                            <img src={image.src} alt={image.alt} />
                        </HoverZoom>
                    </Grid>
                ))}
            </Grid>

            <InfoGallery />
        </Container>
    );
};

export default Gallery;
