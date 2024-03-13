import styles from "./PublishOnlineGuidencePage.module.css";

export const GuidencePageExampleCodeSnippet = () => {
  return (
    <pre>
      <code>
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;html&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;head&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;title&gt;</span>
          My first HTML page
          <span className={styles.hljsAttr}>&lt;/title&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;link</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsName}>rel</span>=
          <span className={styles.hljsString}>"stylesheet"</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsName}>type</span>=
          <span className={styles.hljsString}>"text/css"</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsName}>href</span>=
          <span className={styles.hljsString}>
            "https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css"
          </span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>/&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;style&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>body</span> &#123;
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          font-family:
          <span className={styles.hljsString}>"Courier New"</span>, Courier,{" "}
          <span className={styles.hljsName}>monospace;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;/style&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;/head&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;body&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;h1&gt;</span>
          Welcome to My Website
          <span className={styles.hljsAttr}>&lt;/h1&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;p&gt;</span>
          This is a sample paragraph.
          <span className={styles.hljsAttr}>&lt;/p&gt;</span>
        </span>
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;div</span>
          <span className={styles.hljsName}> id</span>=
          <span className={styles.hljsString}>"timetable-visualisation"</span>
          <span className={styles.hljsAttr}>&gt;&lt;/div&gt;</span>
        </span>
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;script</span>
          <span className={styles.hljsName}> src</span>=
          <span className={styles.hljsString}>
            "https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js"
          </span>
          <span className={styles.hljsAttr}>&gt;&lt;/script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;window.DLUHC.renderTimetableVisualisation&#40;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;developmentPlanFilepath:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsString}>
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/development-plan.csv"
          </span>
          ,
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timetableEventsFilepath:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsString}>
            "https://raw.githubusercontent.com/digital-land/local-plans-timetable/main/assets/timetable.csv"
          </span>
          ,
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.getElementById&#40;
        <span className={styles.hljsTag}>
          <span className={styles.hljsString}>"timetable-visualisation"</span>
        </span>
        &#41;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#41;;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;/script&gt;</span>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;/body&gt;</span>
        </span>
        <br />
        <span className={styles.hljsTag}>
          <span className={styles.hljsAttr}>&lt;/html&gt;</span>
        </span>
      </code>
    </pre>
  );
};
