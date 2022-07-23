import { Button, Grid } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        flexGrow={1}
        sx={{ height: "100%" }}
      >
        <h2>Select a profile to start from</h2>

        <Link href="/profile/katy">
          <Button size="large" variant="contained">
            Katy
          </Button>
        </Link>
        <Button size="large" variant="contained">
          John
        </Button>
        <Button size="large" variant="contained">
          Alex
        </Button>
      </Grid>
    </div>
  );
}
