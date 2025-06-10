import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

import diamond from '../images/diamond.jpg';


const Content = () => {
  return (
    <Container>
      <Grid container sx={{ my: 4 }}>
        <Grid container direction="column" alignItems="center" size={{xs: 12, md: 8, lg: 9}}>
          <Box component="h2" textAlign="center">Алмаз</Box>
          <Box component="p" textAlign="justify">
            Алмазы, состоящие из углерода, кристаллизуются в кубическую решетку, что
            придает им уникальную жесткость и прочность. Они являются самым твердым
            естественным материалом на Земле, получившим оценку 10 по шкале Мооса.
            Благодаря этой твердости алмазы широко используются в промышленности для
            резки и сверления. Хотя большинство алмазов бесцветные, они могут иметь
            различные цвета, включая желтый, коричневый, синий, зеленый и даже
            розовый.
          </Box>
        </Grid>
        <Grid size={{xs: 12, md: 4, lg: 3}} display="flex" justifyContent="center" alignItems="center">
          <Box
            component="img"
            src={diamond}
            alt="Diamond"
            sx={{ borderRadius: 3, maxWidth: '70%' }}
          />
        </Grid>
      </Grid>

        <Grid container direction="column" alignItems="center" sx={{ my: 4 }} size={{xs: 12}}>
            <Box component="h2" textAlign="center">Кобальт</Box>
            <Box component="p" textAlign="justify">
                Кобальт — это химический элемент с символом Co и атомным номером 27. Он
                относится к переходным металлам и обладает высокой прочностью,
                устойчивостью к коррозии и отличной магнитной проницаемостью. Кобальт
                встречается в природе в виде различных минералов, таких как кобальтит и
                арсенопирит, и часто добывается в ассоциации с медью и никелем. Кобальт
                используется в различных отраслях, включая металлургию, электронику и
                производство аккумуляторов.
            </Box>
        </Grid>
    </Container>
  );
};

export default Content;