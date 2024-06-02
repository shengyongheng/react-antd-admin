import { useState, useEffect, useRef } from 'react';

export const useCollapseRows = (eleId: string, value: string, rows: number) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const lineHeightRef = useRef(0);
  const pxToNumber = (px: string) => {
    const num = Number(px.replace('px', ''));
    return num;
  };
  useEffect(() => {
    const ele = document.querySelector(`#${eleId}`) as any;
    const style = window.getComputedStyle(ele as Element, null);
    const clientHeight = ele?.clientHeight; // 容器高度
    const fontSize = pxToNumber(style.fontSize);
    lineHeightRef.current = style.lineHeight === 'normal' ? fontSize + 4 : pxToNumber(style.lineHeight); // 每一行的高度
    const allRows = clientHeight && clientHeight / lineHeightRef.current;
    ele.style.height = rows * lineHeightRef.current + 16 + 'px';
    setIsCollapse(allRows && allRows > rows ? true : false);
  }, [value]); // eslint-disable-line

  return { isCollapse, setIsCollapse, lineHeight: lineHeightRef.current };
};
