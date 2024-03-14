import { CopyBlock } from "react-code-blocks";

import styles from "./snippet.module.css";

type SnippetProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

export const Snippet = ({
  code,
  language = "html",
  showLineNumbers = false,
}: SnippetProps) => {
  return (
    <div className={styles.snippet}>
      <CopyBlock
        language={language}
        text={code}
        showLineNumbers={showLineNumbers}
        codeBlock
      />
    </div>
  );
};
