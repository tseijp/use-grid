import React, {FC, useCallback, useMemo} from "react";
const {atomOneLight, atomOneDark} = require('react-syntax-highlighter/dist/esm/styles/hljs');
const {Light} = require('react-syntax-highlighter');

interface CodeProps {
    code?:string, language?:string, inline?:boolean, dark?:boolean
}
export const Codes:FC<CodeProps> = ({
        code='', language="javascript", inline=false, dark=false, children,
    }) => {
    const onDoubleClick = useCallback((_:any)=>navigator.clipboard.writeText(code),[code])
    const customStyle = useMemo(()=>{
        const display = inline?"inline-block":"fixed"
        const inlineStyle =inline?{verticalAlign:"top",padding:"0 0"}:{}
        return {position:'relative',display,...inlineStyle}
    },[inline])
    return (
        <Light PreTag={inline?"span":"pre"} style={dark?atomOneDark:atomOneLight}
            {...{customStyle, onDoubleClick, language}}
            useInlineStyles={true} showLineNumbers={!inline}>
            {code}</Light>
    );
}
