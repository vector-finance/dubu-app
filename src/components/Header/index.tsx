import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useModal } from "mui-modal-provider";
import { useTranslation } from "react-i18next";
import MenuIcon from "@material-ui/icons/Menu";
import truncateWalletAddress from "utils/truncateWalletAddress";
import useAuth from "hooks/useAuth";
import WalletModal from "../WalletModal";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logoText: {
    textDecoration: "none",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  formControl: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    minWidth: 50,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: "none",
    color: "gray",
    fontWeight: "bold",
    "&:hover": {
      color: "#735858",
    },
  },
  selected: {
    color: "#371110",
    fontWeight: "bold",
  },
  connected: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation("");

  const { login, logout } = useAuth();
  const { account } = useWeb3React();
  const { showModal } = useModal();

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawer(open);
  };

  const Logo = () => {
    return (
      <NavLink to="/" className={classes.logoText}>
        <Grid container spacing={2} alignItems="center" alignContent="center">
          <Grid container spacing={2} alignItems="center" alignContent="center">
            <Grid item>
              <img src="/logo512.png" alt="Logo" height={50} />
            </Grid>
            <Hidden mdDown>
              <Grid item>
                <Typography color="textPrimary" variant="h6">
                  Dubu.Finance
                </Typography>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </NavLink>
    );
  };

  const SectionDesktop = () => {
    return (
      <nav className={classes.sectionDesktop}>
        <NavLink
          to="/"
          exact
          activeClassName={classes.selected}
          className={classes.link}
        >
          {t("dubuPot")}
        </NavLink>
        <NavLink
          to="/my-dubupots"
          exact
          activeClassName={classes.selected}
          className={classes.link}
        >
          {t("myPot")}
        </NavLink>
        <a
          href="https://dubu-finance.gitbook.io/dubu-finance/"
          className={classes.link}
        >
          {t("docs")}
        </a>
        {account === undefined ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              const modal = showModal(WalletModal, {
                login,
                onClose: () => {
                  modal.hide();
                },
              });
            }}
          >
            {t("Connect Wallet")}
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              logout();
            }}
          >
            {truncateWalletAddress(account!)}
          </Button>
        )}
      </nav>
    );
  };

  const SectionMobile = () => {
    return (
      <nav className={classes.sectionMobile}>
        {account === undefined ? (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              showModal(WalletModal);
            }}
          >
            {t("Connect Wallet")}
          </Button>
        ) : (
          <Button variant="outlined" color="primary" size="small">
            {truncateWalletAddress(account!)}
          </Button>
        )}
        <IconButton
          onClick={() => {
            toggleDrawer(true);
          }}
        >
          <MenuIcon />
        </IconButton>
      </nav>
    );
  };

  const MobileDrawer = () => {
    return (
      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <List style={{ width: 250 }}>
          <NavLink
            to="/"
            exact
            activeClassName={classes.selected}
            className={classes.link}
          >
            <ListItem>
              <ListItemText>{t("dubuPot")}</ListItemText>
            </ListItem>
          </NavLink>
          <NavLink
            to="/my-dubupots"
            exact
            activeClassName={classes.selected}
            className={classes.link}
          >
            <ListItem>
              <ListItemText>{t("myPot")}</ListItemText>
            </ListItem>
          </NavLink>
          <a
            href="https://dubu-finance.gitbook.io/dubu-finance/"
            className={classes.link}
          >
            <ListItem>
              <ListItemText>{t("docs")}</ListItemText>
            </ListItem>
          </a>
        </List>
      </Drawer>
    );
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Logo />
          <div className={classes.grow} />
          <SectionDesktop />
          <SectionMobile />
        </Toolbar>
      </AppBar>
      <MobileDrawer />
    </div>
  );
};

export default Header;
