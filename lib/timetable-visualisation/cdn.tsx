import { render } from "react-dom";
import { Visualisation, VisualisationProps } from "./Visualisation";

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
  options: VisualisationProps,
  parentElement: HTMLElement
) => render(<Visualisation {...options} />, parentElement);

window.DLUHC = {
  renderTimetableVisualisation,
};
