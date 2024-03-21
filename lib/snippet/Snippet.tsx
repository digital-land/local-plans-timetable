import { useState } from "react";

import { CodeBlock } from "react-code-blocks";

import { Button } from "../gds-components/button/Button";

import styles from "./snippet.module.css";

type SnippetProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

const defaultCopyButtonText = "Copy code";

export const Snippet = ({
  code,
  language = "html",
  showLineNumbers = false,
}: SnippetProps) => {
  const [buttonText, setButtonText] = useState<string>(defaultCopyButtonText);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setButtonText("Code copied");
      setTimeout(() => setButtonText(defaultCopyButtonText), 5000);
    });
  };

  return (
    <div className={styles.snippet}>
      <Button onClick={handleCopy} className={styles.copyButton}>
        {buttonText}
      </Button>
      <CodeBlock
        language={language}
        text={code}
        showLineNumbers={showLineNumbers}
        codeContainerStyle={{ paddingTop: 35 }}
      />
    </div>
  );
};
