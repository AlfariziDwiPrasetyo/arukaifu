"use client";
import React, { useState, useEffect } from "react";

type renderQuillContentProps = {
  content: string;
};

function RenderQuillContent({ content }: renderQuillContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    setHtmlContent(content);
  }, []);

  return (
    <div
      className="leading-5 h-20 line-clamp-3 tracking-thight"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default RenderQuillContent;
