import { Grid, Box, Typography, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import PropTypes from "prop-types";
import ManualPage from "./manualPage";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import {
  contentPage0,
  contentPage1,
  contentPage2,
  contentPage3,
  contentPage4,
  contentPage5,
  contentPage6,
  contentPage7,
  contentPage8,
} from "./constatant";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ManualContent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const style = {
    minWidth: "40px",
    width: "40px",
  };

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<LooksOneIcon />} styel={style} />
          <Tab icon={<LooksTwoIcon />} styel={style} />
          <Tab icon={<Looks3Icon />} styel={style} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={12}>
            <ManualPage contentPage={contentPage0} />
          </Grid>
          <Grid item xs={6}>
            <ManualPage contentPage={contentPage1} />
          </Grid>
          <Grid item xs={6}>
            <ManualPage contentPage={contentPage2} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={12}>
            <ManualPage contentPage={contentPage3} />
          </Grid>
          <Grid item xs={6}>
            <ManualPage contentPage={contentPage4} />
          </Grid>
          <Grid item xs={6}>
            <ManualPage contentPage={contentPage5} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={12}>
            <ManualPage contentPage={contentPage6} />
          </Grid>
          <Grid item xs={6}>
            <ManualPage contentPage={contentPage7} />
          </Grid>
          <Grid item xs={6}>
            <ManualPage contentPage={contentPage8} />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};
export default ManualContent;
