import styles from '@/styles/Home.module.css';
import * as React from 'react';
import { useState } from 'react';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  Toolbar,
  Box
} from '@mui/material/';
import Featuredrawer1 from './featuredrawer1';
import MenuIcon from '@mui/icons-material/Menu';

const Toolbars = () => {
  const [anchorDrawer, setAnchorDrawer] = useState(null);
  const openDrawer = (event) => {
    setAnchorDrawer(event.currentTarget);
  };
  const closeDrawer = () => {
    setAnchorDrawer(null);
  };

  const [firstDrawer, setfirstDrawer] = useState(null);
  const openfirstDrawer = (event) => {
    setfirstDrawer(event.currentTarget);
  };
  const closefirstDrawer = () => {
    setfirstDrawer(null);
  };

  return (
    <Toolbar className={styles.appbar} sx={{ border: 1, borderColor: 'white' }}>
      <Link onClick={openDrawer} sx={{ color: 'white' }}>
        <MenuIcon />
      </Link>
      <Drawer
        anchor="left"
        open={Boolean(anchorDrawer)}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            marginTop: '100px',
            backgroundColor: 'grey',
            color: 'white',
            flexGrow: 1,
            width: '100%'
          }
        }}
      >
        <Box sx={{ mt: 3 }}>
          <List sx={{ ml: 2 }}>
            <ListItem disablePadding sx={{ marginLeft: 2 }}>
              <MenuIcon />
              <div className={styles.horizontal_spacing}></div>
              <Link
                underline="hover"
                onClick={openfirstDrawer}
                sx={{ color: 'white' }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontSize: '24px', textTransform: 'none' }
                  }}
                >
                  sJKklas{' '}
                </ListItemText>
              </Link>
              <Drawer
                anchor="left"
                open={Boolean(firstDrawer)}
                onClose={closefirstDrawer}
                PaperProps={{
                  sx: {
                    //marginTop: "100px",
                    backgroundColor: 'gray',
                    color: 'black',
                    flexGrow: 1,
                    width: '75%'
                  }
                }}
              >
                <Featuredrawer1 />
              </Drawer>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={'f2'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={'f3'} />
              </ListItemButton>
            </ListItem>
          </List>

          <List sx={{ ml: 2 }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={'f4'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={'f5'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={'f6'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Toolbar>
  );
};

export default Toolbars;
