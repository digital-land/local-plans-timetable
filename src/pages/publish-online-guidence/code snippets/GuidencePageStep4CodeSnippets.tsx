export const GuidencePageStep4CodeSnippets = () => {
  return (
    <pre>
      <code>
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp; window.DLUHC.renderTimetableVisualisation&#40;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;developmentPlanFilepath:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-string">
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv"
          </span>
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timetableEventsFilepath:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-string">
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv"
          </span>
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;document.getElementById&#40;
        <span className="hljs-tag">
          <span className="hljs-string">"timetable-visualisation"</span>
        </span>
        &#41;
        <br />
        &nbsp;&nbsp; &#41;;
        <br />
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;script&gt;</span>
        </span>
      </code>
    </pre>
  );
};
