import { render } from "react-dom";
import { Visualisation, VisualisationProps } from "./Visualisation";

import styles from "./cdn.module.css";

type RenderFunction = (
  options: VisualisationProps,
  element: HTMLElement
) => void;

declare global {
  interface Window {
    DLUHC: Record<string, RenderFunction>;
  }
}

const renderTimetableVisualisation: RenderFunction = (
  options: Omit<VisualisationProps, "className">,
  parentElement: HTMLElement
) =>
  render(
    <Visualisation {...options} className={styles.visualisationContainer} />,
    parentElement
  );

window.DLUHC = {
  renderTimetableVisualisation,
};
