export enum PageRoute {
  Base = "/local-plans-timetable",
  Root = "/",
  LPA = "/what-is-your-local-authority",
  Title = "/title-of-local-plan",
  Description = "/local-plan-description",
  PublishLocalDevelopmentScheme = "/publish-local-development-scheme",
  PublicConsultation = "/public-consultation-stage",
  Publication = "/publication-stage",
  Submission = "/submission",
  IndependentExamination = "/independent-examination-stage",
  PlanAdopted = "/plan-adopted",
  UploadTimetable = "/upload-timetable", // TBC
  Export = "/export-your-timetable",
  UpdateTimetableStatus = "/update-timetable-status", // TBC
  StatusChangeEvent = "/status-change-reason", // TBC
}

export enum Journey {
  Create = "create",
  Update = "update",
}
