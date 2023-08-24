import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation, useNavigate } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: '#000000',
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();

  const navigate = useNavigate();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children, permission, logout } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'))
    if(session === null) {
      navigate('/', { replace: true });
    }
 }, [navigate])

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    backgroundColor: '#ffffff !important',
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        {permission === true? 
          <ListItemStyle
            onClick={handleOpen}
            sx={{
              ...(isActiveRoot && activeSubStyle),
            }}
          >
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {info && info}
            <Iconify
              icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
              sx={{ width: 16, height: 16, ml: 1 }}
            />
          </ListItemStyle>
        : null}

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <div key={title}>
                  {title === "Disbursal" || title === "Bill" || title === "MIS Report"  || title === "Builder Pay" || title === "Format"
                  ?
                    <ListItemStyle
                      style={{textAlign: 'center',}}
                      component={RouterLink}
                      to={path}
                      sx={{
                        ...(isActiveSub && activeSubStyle),
                      }}
                    >
                      <ListItemText disableTypography style={{backgroundColor: '#292929',padding: '5px',borderRadius: '50px',color: 'white', maxWidth: '120px', marginLeft: '1.3cm'}} primary={`${title} ↴`} />
                    </ListItemStyle>
                  :
                  <ListItemStyle
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#ffffff',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: '#000000',
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                    </ListItemStyle>
                  }
                </div>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <>
      {permission === true? 
        <ListItemStyle
          component={RouterLink}
          to={path}
          sx={{
            ...(isActiveRoot && activeSubStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </ListItemStyle>
      : null}
    </>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
