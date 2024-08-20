import "./framework/reset.css";
import { configurePrefix, waitForComponents } from "./framework/register";

configurePrefix("x");
waitForComponents();

export { Theme } from "./components/Theme";
export { Install } from "./components/Install";
export { AppBar } from "./components/AppBar";
export { Chip } from "./components/Chip";
export { Table } from "./components/Table";
export { Tooltip } from "./components/Tooltip";
export { Select } from "./components/Select";
export { Card } from "./components/Card/Card";
export { CardMedia } from "./components/Card/CardMedia";
export { CardContent } from "./components/Card/CardContent";
export { CardFooter } from "./components/Card/CardFooter";
export { Spinner } from "./components/Spinner";
export { Link } from "./components/Link";
export { Typography } from "./components/Typography";
export { Container } from "./components/Container";
export { Grid } from "./components/Grid";
export { Stack } from "./components/Stack";
export { Block } from "./components/Block";
export { Button } from "./components/Button";
export { Switch } from "./components/Switch";
export { Badge } from "./components/Badge";
export { ColorPicker } from "./components/ColorPicker";
export { Divider } from "./components/Divider";
export { Box } from "./components/Box";
export { Checkbox } from "./components/Checkbox";
export { Icon } from "./components/Icon";
export { List } from "./components/List";
export { Tabs } from "./components/Tabs/Tabs";
export { TabPanel } from "./components/Tabs/TabPanel";
export { TabPanels } from "./components/Tabs/TabPanels";
export { TabButton } from "./components/Tabs/TabButton";
export { TabButtons } from "./components/Tabs/TabButtons";
export { Loading } from "./components/Loading";
export { BottomNavigation } from "./components/BottomNavigation/BottomNavigation";
export { BottomNavigationAction } from "./components/BottomNavigation/BottomNavigationAction";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }