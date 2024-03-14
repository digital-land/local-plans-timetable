export const importCSSSnippet =`<link rel="stylesheet" type="text/css" href="https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css"/>`;

export const importJavaScriptSnippet =`<script src="https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js"></script>`;

export const renderTimetableVisualisationSnippet = `<script>
  window.DLUHC.renderTimetableVisualisation(
    {
      developmentPlanFilepath:
        "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv",
      timetableEventsFilepath:
        "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv",
    },
    document.getElementById("timetable-visualisation")
  );
</script>`;

export const exampleHTMLSnippet = `<html>
  <head>
    <title>My First HTML Page</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css"
    />
    <style>
      body {
        font-family: "Courier New", Courier, monospace;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is a sample paragraph.</p>

    <div id="timetable-visualisation"></div>

    <script src="https://cdn.statically.io/gh/digital-land/local-plans-timetable/6812836f14b256ff34f7d57cea63e472b3c6fabb/timetable-visualisation.min.js"></script>
    <script>
      window.DLUHC.renderTimetableVisualisation(
        {
          developmentPlanFilepath:
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv",
          timetableEventsFilepath:
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv",
        },
        document.getElementById("timetable-visualisation")
      );
    </script>
  </body>
</html>`;