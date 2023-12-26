import React from 'react';

/**
 * @desc IfElse - 条件判断
 * IfElse 可以让你更优雅地编排视图上的逻辑判断，去掉大量的三元表达式。
 */

export type IIfElseProps = React.PropsWithChildren<{
    /**
     *       显示条件
     * @default
     */
    if: boolean;
    /**
     *       当显示条件不满足时显示
     * @default
     */
    else?: JSX.Element;
    /**
     *       当显示条件不满足时显示
     * @default
     */
    children?: any;
}>;

export const IfElse: React.FC<IIfElseProps> = function IfElse(props: IIfElseProps) {
    const { children } = props;
    const ifCondition = props.if;
    const elseElement = props.else;
    return ifCondition ? <>{children}</> : elseElement || null;
};
