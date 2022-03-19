import React, {useState} from 'react';
import classes from './MyComments.module.css'


const MyComments = ({props}) => {

    const [comm,setComm] = useState({id: Date.now() % 1000,email:'',body:'',name:''})

    const setComment = () => {
       setComm({...comm ,id: (Date.now() % 1000)})
       props(comm)
    }

    return (
        <div className={classes.MyComments}>

            <hr className={classes.hr}/>

            <div className={classes.inputs}>
                <input
                    onChange={e=>setComm({...comm ,email: e.target.value})}
                    className={classes.inputEmail}
                    type="email"
                    placeholder="Email..."/>
                <input
                    onChange={e=>setComm({...comm ,name: e.target.value})}
                    className={classes.inputName}
                    type="text"
                    placeholder="Имя..."/>
                <input
                    onChange={e=>setComm({...comm ,body: e.target.value})}
                    className={classes.inputMsg}
                    type="text"
                    placeholder="Коментарий"/>
                <button
                    onClick={setComment}
                    className={classes.inputBtn} >Отправить</button>
            </div>

            <hr className={classes.hr}/>

        </div>
    );
};

export default MyComments;