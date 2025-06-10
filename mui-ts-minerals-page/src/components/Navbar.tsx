import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer'
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';

import { useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

const StyledButton = styled(Button)`
    &:hover {
        background-color: blue;
        color: white;
    }
`;

interface ComponentProps {
    active: string;
}

function NavBar({ active } : ComponentProps) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    return (
        <AppBar      
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                mt: '28px',
            }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                        Полезные ископаемые
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <StyledButton variant={active === '1' ? 'contained' : 'text'} color="info" size="medium">
                            Главная
                        </StyledButton>
                        <StyledButton variant={active === '2' ? 'contained' : 'text'} color="info" size="medium">
                            Галлерея
                        </StyledButton>
                        <StyledButton variant={active === '3' ? 'contained' : 'text'} color="info" size="medium">
                            Список разных ископаемых
                        </StyledButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }}}>    
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={ open }
                            onClose={toggleDrawer(false)}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem >
                                    <Typography style={{ fontWeight: active === '1' ? 'bold' : 'normal' }}>
                                        Главная
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography style={{ fontWeight: active === '2' ? 'bold' : 'normal' }}>
                                        Галлерея
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                <Typography style={{ fontWeight: active === '3' ? 'bold' : 'normal' }}>
                                    Список разных ископаемых
                                </Typography>
                                </MenuItem>  
                            </Box>
                        </Drawer>      
                    </Box>
                </StyledToolbar>
            </Container>  
        </AppBar>
    );
}

export default NavBar;