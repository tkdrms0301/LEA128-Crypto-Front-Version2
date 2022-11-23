import React, { Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Switch,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  GitHub,
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import { Navigation } from "../components";
import { Favorite } from "@material-ui/icons";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  appBarShift: {
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 2,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 2,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  collapseButton: {
    color: "inherit",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  extendButton: {
    marginRight: 36,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  extendButtonHidden: {
    display: "none",
  },
  toolbar: { paddingRight: 24, ...theme.mixins.toolbar },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 0 10px 8px",
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    position: "fixed",
    height: "100vh",
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    color: theme.palette.type === "light" && theme.palette.grey[100],
    backgroundColor: theme.palette.secondary.main,
  },
  drawerPaperClose: {
    [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(11),
    },
  },
  appBarTitle: {
    flex: 1,
    fontWeight: 200,
  },
  contentShift: {
    flexGrow: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },

  drawerFooter: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  copyrightText: {
    fontSize: 11,
    transition: "all .3s",
    [theme.breakpoints.up("sm")]: {
      opacity: (extend) => (extend ? 1 : 0),
    },
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  scroll: {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(33, 122, 244, .1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#217af4",
      height: "30%",
      outline: "1px solid slategrey",
    },
    display: "block",
  },
}));

const MainLayout = ({ themeConfig, navigationData, children }) => {
  const history = useHistory();
  const theme = useTheme();
  const [extended, setExtended] = React.useState(true);
  const classes = useStyles(extended);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExtendOpen = () => {
    setExtended(true);
  };
  const handleExtendClose = () => {
    setExtended(false);
  };

  React.useEffect(() => {
    history.listen(() => setMobileOpen(false));
  }, [history]);

  const drawer = (
    <Fragment>
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={handleExtendClose}
          className={classes.collapseButton}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Navigation data={navigationData} collapsed={!extended} />
      <Divider />
      <Toolbar className={classes.drawerFooter}></Toolbar>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBarShift, extended && classes.appBar)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="extend drawer"
            onClick={handleExtendOpen}
            className={clsx(
              classes.extendButton,
              extended && classes.extendButtonHidden
            )}
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appBarTitle}>
            Kumoh Encryption System
          </Typography>
          <Switch
            checked={themeConfig.state}
            onChange={themeConfig.handler}
            name="themeSwitch"
          />
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !extended && classes.drawerPaperClose
            ),
          }}
          open={extended}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={clsx(classes.contentShift, extended && classes.content)}>
        <div className={classes.toolbar} />
        <div className={classes.scroll}>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  navigationData: PropTypes.arrayOf(PropTypes.object).isRequired,
  themeConfig: PropTypes.object,
  window: PropTypes.func,
  children: PropTypes.node,
};
