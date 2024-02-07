import { DevelopmentPlan } from "../types/timetable";
type PlanViewerProps = {
    plan: DevelopmentPlan;
};
export declare const PlanViewer: ({ plan: { name, description, adoptedDate, periodStartDate, periodEndDate, developmentPlanType, developmentPlanGeography, organisations, entryDate, startDate, endDate, documentationUrl, timetableEvents, }, }: PlanViewerProps) => import("react/jsx-runtime").JSX.Element;
export {};
