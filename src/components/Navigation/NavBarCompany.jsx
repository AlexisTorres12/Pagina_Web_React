import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, FormControl, InputLabel, Select, MenuItem, Drawer, Divider, CssBaseline, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { AccountCircle } from '@mui/icons-material'

//Icons
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//Css
import '../../css/Navigation/NavBarCompany.css'

//Images
import logo from'../../assets/images/Logos/Zinergia_Logo.png'

export function NavBarCompany({company}){
    const theme = useTheme();
    
    const [open, setOpen] = React.useState(false);
    
    const [isOpen, setIsOpen] = React.useState(false)
    const setIsOpenMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
        setIsOpenMenu();
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setIsOpenMenu();
    };

    const selectClassName = isOpen ? "select-company-appbar-open" : "select-company-appbar-close"

    const [isSelectedCompany, setSelectedCompany] = React.useState(company);
    const setCompany = (event) => {
        setSelectedCompany(event.target.value);
    }
    
    const drawerWidth = 240;
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
    }),
        overflowX: 'hidden',
    });
      
    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // Necesario para que se mezcle con el toolbar
        ...theme.mixins.toolbar,
      }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
    );

    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className='toolBar-appbar'>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    <img className='image-logo-navbar' src={logo} />
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {/* En caso de cambiar la direccion del tema se cambia en automatico el icono */}
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <Box className={selectClassName}>
                    <br/>
                    <FormControl fullWidth>
                        <InputLabel id="select-company-label">Empresa:</InputLabel>
                        <Select
                            labelId='select-company-label'
                            id='select-company'
                            value="NYC"
                            label="Empresa"
                            onChange={setCompany}
                            >       
                            <MenuItem value="NYC">NYC</MenuItem>
                            <MenuItem value="TU">TU</MenuItem>
                            <MenuItem value="NMX">NMX</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    </Box>
                <Divider />
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Drawer>
        </Box>

    );
}