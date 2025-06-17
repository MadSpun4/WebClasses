import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(2),
}));

interface ComponentProps {
    building: {
        img: string, 
        title: string, 
        description: string[],
    };
    index: number;
}

function BuildCard({ building, index } : ComponentProps) {
    const isOdd = index % 2 === 1;

    return (
        <Card sx={{  
            display: 'flex',
            flexDirection: { xs: isOdd ? 'row' : 'row-reverse', md: isOdd ? 'row' : 'row-reverse' }
         }}>
            <CardMedia
                component="img"
                alt={ building.title }
                image={ building.img }
            />
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        { building.title }
                    </Typography>
                    { building.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">    
                            { item }
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'end'}} >
                    <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default BuildCard;
