/**
 * 该组件会异步加载 svg icon 资源，如果组件渲染频繁并且没有做优化，会导致图标有闪烁现象
 * 如果大量的使用某个 svg icon，不建议使用该组件
 */

import Icon from '@ant-design/icons';
import axios from 'axios';
import React, { ComponentProps, memo, useCallback, useEffect, useRef, useState } from 'react';

import { iconPaths } from './icon-paths';

const SvgIcon = memo(({ svgString, variousColors = false }: { svgString?: string; variousColors?: boolean }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgString) {
            try {
                const parser = new DOMParser();
                console.log(svgString, 'svgString');
                const svg = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
                console.log(svg, 'svg');
                if (!svg) {
                    return;
                }
                console.log(svg.viewBox, 'svg.viewBox');
                const { x, y, width, height } = svg.viewBox.baseVal;
                svgRef.current!.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);

                if (variousColors) {
                    svgRef.current?.setAttribute('fill', 'none');
                }

                const children = svg.childNodes;
                console.log(children, 'svg.childNodes');
                for (let i = 0; i < children.length; i++) {
                    const child = children[i].cloneNode(true);
                    svgRef.current!.appendChild(child);
                }
            } catch (error) {
                console.log('Load svg error:', error);
            }
        }
    }, [svgString, variousColors]);

    return <svg ref={svgRef} xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='currentColor' />;
});

/**
 * @param name 图标名称，在 ./icon-paths.ts 文件中维护了一些常用的图标名称
 * @param iconPath 图标路径，如果使用了 iconPath，优先使用该字段获取图标
 * @param restProps 其他属性
 */
export const KmsIcon = memo(
    ({
        name,
        iconPath,
        variousColors = false,
        ...restProps
    }: { name?: keyof typeof iconPaths; iconPath?: string; variousColors?: boolean } & ComponentProps<typeof Icon>) => {
        const _iconPath = iconPath ?? (name ? (iconPaths[name] as string) : '');

        const [svgString, setSvgString] = useState('');

        useEffect(() => {
            if (_iconPath) {
                axios
                    .get(_iconPath, {
                        responseType: 'text'
                    })
                    .then((response) => {
                        setSvgString(response.data);
                    })
                    .catch(() => {
                        console.error(`Failed to fetch icon: ${_iconPath}`);
                    });
            }
        }, [_iconPath]);

        const _SvgIcon = useCallback(() => {
            return <SvgIcon svgString={svgString} variousColors={variousColors} />;
        }, [svgString, variousColors]);

        return <Icon component={_SvgIcon} {...restProps} />;
    }
);

export const KIcon = KmsIcon;
