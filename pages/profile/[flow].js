import { Button, Grid, Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const flowData = {
  katy: {
    firstName: "Katy",
    lastName: "Smith",
    age: "32",
  },
};

export default function Home() {
  const router = useRouter();
  const { flow } = router.query;

  if (!flow) {
    return <div>Go home and select a profile to start from</div>;
  }
  return <div>Hi, {flowData[flow].firstName}</div>;
}
