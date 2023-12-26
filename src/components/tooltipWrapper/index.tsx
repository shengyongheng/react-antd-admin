import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'antd';
import type { TooltipPlacement } from 'antd/lib/tooltip';

interface ITooltipWrapper {
    text: string;
    maxWidth: number;
    style?: React.CSSProperties;
    placement?: TooltipPlacement;
}

const TooltipWrapper = (props: ITooltipWrapper) => {
    const { text, style, maxWidth, placement = 'top' } = props;

    const [showTooltip, setShowTooltip] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    const ellipsisStyledRef = useRef<React.CSSProperties>({
        width: maxWidth + 'px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

    useEffect(() => {
        const divElement = divRef.current;
        if (divElement) {
            setShowTooltip(divElement.scrollWidth > divElement.offsetWidth);
        }
    }, [maxWidth, text]);

    return (
        <>
            <Tooltip title={showTooltip ? text : ''} placement={placement}>
                <div ref={divRef} style={{
                    ...style,
                    ...ellipsisStyledRef.current,
                }} >
                    {text}
                </div>
            </Tooltip >
        </>
    );
};

export default TooltipWrapper;
