import { VisualisationProps } from "./Visualisation";
type RenderFunction = (options: VisualisationProps, element: HTMLElement) => void;
declare global {
    interface Window {
        DLUHC: Record<string, RenderFunction>;
    }
}
export {};
