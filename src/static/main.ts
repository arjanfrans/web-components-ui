import {
  configurePrefix,
  loadComponents,
  waitForComponents,
} from "../lib/main";

configurePrefix("x");
waitForComponents();

export { Theme } from "../lib/main";
export { Install } from "../lib/main";
export { AppBar } from "../lib/main";
export { Chip } from "../lib/main";
export { Table } from "../lib/main";
export { Tooltip } from "../lib/main";
export { Select } from "../lib/main";
export { Card } from "../lib/main";
export { CardMedia } from "../lib/main";
export { CardContent } from "../lib/main";
export { CardFooter } from "../lib/main";
export { Spinner } from "../lib/main";
export { Link } from "../lib/main";
export { Typography } from "../lib/main";
export { Container } from "../lib/main";
export { Grid } from "../lib/main";
export { Figure } from "../lib/main";
export { Stack } from "../lib/main";
export { Block } from "../lib/main";
export { Button } from "../lib/main";
export { Switch } from "../lib/main";
export { Badge } from "../lib/main";
export { ColorPicker } from "../lib/main";
export { Divider } from "../lib/main";
export { Box } from "../lib/main";
export { Checkbox } from "../lib/main";
export { Icon } from "../lib/main";
export { List } from "../lib/main";
export { Tabs } from "../lib/main";
export { TabPanel } from "../lib/main";
export { TabPanels } from "../lib/main";
export { TabButton } from "../lib/main";
export { TabButtons } from "../lib/main";
export { Loading } from "../lib/main";
export { Splash } from "../lib/main";
export { BottomNavigation } from "../lib/main";
export { BottomNavigationAction } from "../lib/main";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope,
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}

loadComponents();
