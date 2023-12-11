import React, { useRef, useEffect } from 'react';
import { isArray } from 'lodash';

export interface IClickOutsideProps {
    /**
     *       渲点击外部后的触发方法
     * @default
     */
    onClickOutside: (event: MouseEvent) => void;
    /**
     * 可以设置一组 dom 选择器，点击在这些选择器上，不会触发上面的回调
     * @default
     */
    exclude?: string[];
}

const ClickOutsideFn = (props: React.PropsWithChildren<IClickOutsideProps>) => {
    const wrapperRef = useRef<Element>();
    const { onClickOutside, exclude = [], children } = props;
    const onMousedown = (event: MouseEvent) => {
        const current = wrapperRef?.current;
        if (current) {
            const excludeDoms: Element[] = [current];
            exclude.forEach((item) => {
                try {
                    document.querySelectorAll(item).forEach((dom) => {
                        excludeDoms.push(dom);
                    });
                } catch {
                    console.warn(`[@bixi-design/core:ClickOutside]: query dom fail, dom selector: ${item}`);
                }
            });
            if (excludeDoms.every((dom) => !dom.contains(event.target as Element))) {
                onClickOutside(event);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', onMousedown);
        return () => {
            document.removeEventListener('mousedown', onMousedown);
        }
    }, []);

    // 处理没有子元素或者子元素为多个的情况
    if (!children || isArray(children)) {
        console.error('[@bixi-design/core:ClickOutside]: component has and can only contain one child element');
        return null;
    }
    try {
        return React.cloneElement(children as React.ReactElement<any>, { ref: wrapperRef });
    } catch (e) {
        console.error(`[@bixi-design/core:ClickOutside]: component render fail, cause: ${String(e)}`);
        return null;
    };

}

export default ClickOutsideFn
