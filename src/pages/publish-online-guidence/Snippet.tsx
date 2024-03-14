import { CopyBlock } from "react-code-blocks";

import "./snippet.css";

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
    <div className="snippet">
      <CopyBlock
        language={language}
        text={code}
        showLineNumbers={showLineNumbers}
        codeBlock
      />
    </div>
  );
};
