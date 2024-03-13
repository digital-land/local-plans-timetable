import styles from "./PublishOnlineGuidencePage.module.css";

export const JavaScriptTagCodeSnippet = () => {
  return (
    <pre>
      <code>
        <span className={styles.hljsTag}>
          <span className={styles.hljsString}>&lt;script src=</span>
          "https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js"
          <span className={styles.hljsString}>&gt;&lt;/script&gt;</span>
        </span>
      </code>
    </pre>
  );
};
