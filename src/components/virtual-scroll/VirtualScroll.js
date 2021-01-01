import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

const VirtualScroll = props => {
    const [ref, inView] = useInView();

    // useEffect( ()=>{

    //     console.log("use effect testing ref ", inView);
    // }, inView);


    
    // return (
    //  <>  {inView?props.scrollNext():null} <span>{Array.from(props.middle).map( child=><span className="intercepted">{child}</span>)}</span><div ref={ref}></div></>
    // );

    return (
        <>{
            props.rowRenderer(props.data)
        }</>
    )
}

export default VirtualScroll;