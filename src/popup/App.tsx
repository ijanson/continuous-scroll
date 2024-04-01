import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export default function App() {

  const [enabled, setEnabled] = React.useState(false);
  const [speed, setSpeed] = React.useState(50);

  React.useEffect(() => {
    (async function () {
        const values = await browser.storage.local.get().then((val) => {return val});
        "enabled" in values ? setEnabled(values.enabled) : browser.storage.local.set({"enabled":enabled});
        "speed" in values ? setSpeed(values.speed) : browser.storage.local.set({"speed":speed});
        // console.log(values);
    }())
  }, []);

const handleClick = () => {
    setEnabled(!enabled);
    browser.storage.local.set({"enabled":!enabled});
  };

  const handleChange = (_event: Event, value: number | number[]) => {
    setSpeed(value as number);
    browser.storage.local.set({"speed":value});
  }

  return (
    <Box
      padding={3}
      justifyContent='center'
    >
      <Grid container spacing={2} direction='column' alignItems='stretch'>
        <Grid item>
          <Typography align='center'>
            Continuous Scroll
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            onClick={handleClick}
            color={enabled ? "success" : "error"}
            fullWidth
          >
            {enabled ? "Enabled" : "Disabled"}
          </Button>
        </Grid>
        <Grid item>
          <Slider value={speed} aria-label="Default" valueLabelDisplay="auto" onChange={handleChange} />
        </Grid>
      </Grid>
    </Box>
  );
}
