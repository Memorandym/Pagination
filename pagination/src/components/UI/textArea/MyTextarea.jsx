import React from 'react';
import classes from './MyTextarea.module.css'

const MyTextArea = React.forwardRef( (props , ref) => {
    return (
        <textarea  ref={ref} className={classes.MyTextArea} {...props}/>
    );
});

export default MyTextArea;