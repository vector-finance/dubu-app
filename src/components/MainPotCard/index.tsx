import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent, Button, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type MainPotCardProp = {
  season: string;
  participant: string;
  tvl: string;
  end: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: { height: "100%", maxWidth: 500 },
  logo: {
    height: 100,
  },
}));

const MainPotCard: React.FC<MainPotCardProp> = ({
  season,
  participant,
  tvl,
  end,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation("");

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          spacing={3}
        >
          <Grid
            container
            xs={12}
            spacing={4}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={6}>
              <img src="/logo512.png" alt="dubu" className={classes.logo} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">#{season}</Typography>
              <Typography variant="h6"> {t("dubuPot")}</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={6} spacing={1}>
            <Grid item>
              <Typography variant="caption">{t("ssrPrize")}</Typography>
              <Typography>$1,132,512</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{t("nextDraw")}</Typography>
              <Typography>
                {(dayjs.extend(relativeTime), dayjs("2021.08.26").fromNow())}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={6}
            justifyContent="flex-end"
            spacing={1}
          >
            <Grid item>
              <Typography variant="caption">TVL</Typography>
              <Typography>${tvl}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{t("participants")}</Typography>
              <Typography>{participant}</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12}>
              {end === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  disabled
                >
                  {t("endedPot")}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={() => {
                    history.push("pot");
                  }}
                >
                  {t("Let's DUBU")}
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                {t("The odds for the winner are as follows")}: SSR 3%, SR 7%, R
                15%, N 75%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MainPotCard;
