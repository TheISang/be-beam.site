import type React from 'react';

export default function TitleAndDes({
  title,
  wrapStyle = 'flex items-center gap-2',
  titleStyle = 'text-t3 mb-4',
  children,
}: {
  title: string;
  wrapStyle?: string;
  titleStyle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={wrapStyle}>
      <p className={titleStyle}>{title}</p>

      {children}
    </div>
  );
}
