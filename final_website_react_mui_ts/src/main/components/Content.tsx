import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import mineralsData from "../../data";
import { Typography, styled } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(2),
}));

const diamondData = mineralsData.find(item => item.title === 'Алмаз')!;
const oilData = mineralsData.find(item => item.title === 'Нефть')!;

const Content = () => {
  return (
    <Container>
      <Grid container sx={{ my: 4 }}>
        <Grid container direction="column" alignItems="center" size={{xs: 12, md: 8, lg: 9}}>
          <Box component="h2" textAlign="center">
            <Typography variant="h4" sx={{ color: '#666666' }}>
              {diamondData.title}
            </Typography>
          </Box>

          <Box component="p" textAlign="justify">
            <StyledTypography>
              {diamondData.description[0]}
            </StyledTypography>
          </Box>

          <Box component="p" textAlign="justify">
            <StyledTypography>
              {diamondData.description[1]}
            </StyledTypography>
          </Box>
        </Grid>
        <Grid size={{xs: 12, md: 4, lg: 3}} display="flex" justifyContent="center" alignItems="center">
          <Box
            component="img"
            src={diamondData.img}
            alt="Diamond"
            sx={{ borderRadius: 3, maxWidth: '70%' }}
          />
        </Grid>
      </Grid>

        <Grid container direction="column" alignItems="center" sx={{ my: 4 }} size={{xs: 12}}>
            <Box component="h2" textAlign="center">
              <Typography variant="h4" sx={{ color: '#666666' }}>
                {oilData.title}
              </Typography>
            </Box>

            <Box component="p" textAlign="justify">
              <StyledTypography>
                {oilData.description[0]}
              </StyledTypography>
            </Box>

            <Box component="p" textAlign="justify">
              <StyledTypography>
                {oilData.description[1]}
              </StyledTypography>
            </Box>
        </Grid>
    </Container>
  );
};

export default Content;