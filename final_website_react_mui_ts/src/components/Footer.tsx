import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
        sx={{
            borderTop: 1,
            py: 2,
            mt: 4,
        }}
    >
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Группа: Б9122-09.03.04(5)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Выполнил: Поляков Артём
                </Typography>
            </Box>
        </Container>
    </Box>
  );
}

export default Footer;
