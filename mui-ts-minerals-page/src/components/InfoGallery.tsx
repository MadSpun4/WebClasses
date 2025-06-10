import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import potassium from '../images/potassium.jpg';
import cobalt from '../images/cobalt.jpg';
import lead from '../images/lead.jpg';

const InfoGallery = () => {
    const items = [
        {
            src: potassium,
            alt: 'Калий',
            description: 'Калий - химический элемент 1-й группы (по устаревшей классификации — главной подгруппы первой группы, IA), ...',
        },
        {
            src: cobalt,
            alt: 'Кобальт',
            description: 'Кобальт - это серебристо-белый, слегка желтоватый переходный металл с розоватым или синеватым отливом.',
        },
        {
            src: lead,
            alt: 'Свинец',
            description: 'Свинец - токсичный металл природного происхождения, встречающийся в земной коре.',
        },
    ];

    return (
        <Container>
            <Grid container justifyContent="space-around" alignItems="center" spacing={4} sx={{ my: 4 }}>
                {items.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }} textAlign="center">
                        <Box
                            component="img"
                            src={item.src}
                            alt={item.alt}
                            sx={{
                                borderRadius: '50%',
                                width: 60,
                                height: 60,
                                mb: 2,
                            }}
                        />
                        <Box component="p" sx={{ m: 0 }}>
                            {item.description}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InfoGallery;