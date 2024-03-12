export const GuidencePageExampleCodeSnippet = () => {
  return (
    <pre>
      <code>
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;html&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;head&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;title&gt;</span>
          My first HTML page
          <span className="hljs-attr">&lt;/title&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;link</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-name">rel</span>=
          <span className="hljs-string">"stylesheet”</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-name">type</span>=
          <span className="hljs-string">"text/css"</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-name">href</span>=
          <span className="hljs-string">
            ”https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css”
          </span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">/&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;style&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">body</span> &#123;
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          font-family:
          <span className="hljs-string">"Courier New"</span>, Courier,{" "}
          <span className="hljs-name">monospace;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; &#125;
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;/style&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;/head&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;body&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;h1&gt;</span>
          Welcome to My Website
          <span className="hljs-attr">&lt;/h1&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;p&gt;</span>
          This is a sample paragraph.
          <span className="hljs-attr">&lt;/p&gt;</span>
        </span>
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;div</span>
          <span className="hljs-name"> id</span>=
          <span className="hljs-string">"timetable-visualisation"</span>
          <span className="hljs-attr">&gt;&lt;/div&gt;</span>
        </span>
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;script</span>
          <span className="hljs-name"> src</span>=
          <span className="hljs-string">
            "https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js"
          </span>
          <span className="hljs-attr">&gt;&lt;/script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; window.DLUHC.renderTimetableVisualisation&#40;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;developmentPlanFilepath:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-string">
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv"
          </span>
          ,
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timetableEventsFilepath:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-string">
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv"
          </span>
          ,
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.getElementById&#40;
        <span className="hljs-tag">
          <span className="hljs-string">"timetable-visualisation" </span>
        </span>
        &#41;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&#41;;
        <br />
        &nbsp;&nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;/script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;/body&gt;</span>
        </span>
        <br />
        <span className="hljs-tag">
          <span className="hljs-attr">&lt;/html&gt;</span>
        </span>
      </code>
    </pre>
  );
};
