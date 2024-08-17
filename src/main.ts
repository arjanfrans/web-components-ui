import "./components/framework/reset.css";
import {
  configurePrefix,
  removeProgressBar,
  waitForComponents,
} from "./components/framework/register";

configurePrefix("x");
waitForComponents();

export { Theme } from "./components/Theme";
export { Chip } from "./components/Chip";
export { Table } from "./components/Table";
export { Tooltip } from "./components/Tooltip";
export { Select } from "./components/Select";
export { Card } from "./components/Card";
export { CardMedia } from "./components/CardMedia";
export { CardContent } from "./components/CardContent";
export { CardFooter } from "./components/CardFooter";
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

removeProgressBar();
