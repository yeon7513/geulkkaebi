import React from 'react';

// 문자열 줄바꿈 변환
export const formatLineBreaks = (text) => {
  if (!text) {
    return null;
  }

  const normalizedText = text.replace(/<br\s*\/?>/gi, '\n');

  return normalizedText.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      <br />
    </React.Fragment>
  ));
};
