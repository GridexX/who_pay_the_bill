import React, {useState, useContext, useRef} from "react";
import { Button, Form, Alert} from 'react-bootstrap';

import { MyContext } from '../context';

const Stage1 = () => {

    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false,'']);

    const handleSumbit = (e) => {
        e.preventDefault();
        const value = textInput.current.value
        const validate = validateInput(value);

        if(validate) {
            // form is valid add player
            setError([false,'']);
            context.addPlayer(value);
            textInput.current.value = '';
        }
    }

    const validateInput = (value) => {
        if(value === '') {
            setError([true, 'Sorry you need to add something']);
            return false;
        }
        if(value.length < 3) {
            setError([true, 'Sorry you need 3 char at least']);
            return false;
        }
        return true;
    }

    console.log(context);

    return (
      <>
       <Form onSubmit={handleSumbit} className="mt-4">
           <Form.Group>
                <Form.Control 
                    type='text'
                    placeholder='Add player name'
                    name='player'
                    ref={textInput}
                />
           </Form.Group>

           { error[0] ?
            <Alert variant="danger ">
                {error[1]}
            </Alert>
            :
            null
           }
           <br/>
           <Button className="miami" variant="primary" type="submit">
               Add player 
           </Button>
       </Form>
       {
           context.state.players && context.state.players.length > 0 ?
            <>
                <hr/>
                <div>
                    <ul className="list-group">
                        { context.state.players.map((item,id) => (
                            <li key={id} className="list-group-item d-flex 
                            justify-content-between align-items-center list-group-item-action">
                                {item}
                                <span className="badge badge-danger" onClick={() => context.removePlayer(id)}>x</span>
                            </li>
                        )) 

                        }
                    </ul>
                    { context.state.players.length > 0 ?
                    <div className="action_button"
                    onClick={()=> context.next()}>
                        NEXT
                    </div>
                    : null}
                </div>
            </>
           : null
       }
      </>   
    );
}

export default Stage1;