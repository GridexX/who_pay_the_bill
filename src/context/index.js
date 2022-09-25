import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = React.createContext();

class MyProvider extends Component {
    state = {
        stage:1,
        players:['Arsène', 'Mika', 'Lili'],
        result:'',
    }

    addPlayerHander = (name) => {
        this.setState((prevState) => ({
            players:[
                ...prevState.players,
                name
            ]
        }));
    }

    removePlayerHandler = (index) => {
        const newPlayers = this.state.players;
        let removePlayer = newPlayers.splice(index,1);
        this.setState({
            players: newPlayers
        })
        toast.success(`${removePlayer} was removed from the list`, {
            autoClose: 3000,
            theme: 'dark'
        });
    }

    nextHandler = () => {
        const { players } = this.state; 

        if( players.length > 1 ) {
            this.setState({
                stage: 2
            }, ()=> {
                setTimeout(() => (
                    this.generateLooser()
                ));
            })
        } else {
            toast.error("You need more than one player", {
                autoClose: 3000,
                theme: 'dark'
            });
        }
    }

    generateLooser = () => {

        const {players, result} = this.state;

        const getDifferentLooser = () => {
            //avoid double entry in array
            let playersOnce = Array.from(new Set(players));
            let looser = '';
            console.log(playersOnce);
            do {
                const randomIndex = Math.floor(Math.random()*playersOnce.length);
                looser = playersOnce[randomIndex];
            } while(result === looser);
            return looser;
        }


        this.setState({
            //result: players[Math.floor(Math.random()*players.length)]
            result: getDifferentLooser()
        })
    }

    resetGame = () => {
        this.setState({
            stage:1,
            players:[],
            result:'',
        })
    }

    render() {
        return (
            <>
            <MyContext.Provider value={{
                state: this.state,
                addPlayer: this.addPlayerHander,
                removePlayer: this.removePlayerHandler,
                next: this.nextHandler,
                getNewLooser: this.generateLooser,
                resetGame: this.resetGame,
            }}>
                {this.props.children}
            </MyContext.Provider>
            <ToastContainer />
            </>
        )
    }
}

export {MyContext, MyProvider}