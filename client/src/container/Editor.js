import React, { Component } from 'react';
import styled from 'styled-components'

const TextArea = styled.textarea`
    width: ${props => props.width + 'px'};
    height: ${props => props.height + 'px'};
    margin-bottom: 20px;
    padding: 10px 5px;
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    
    text-decoration: none;
    margin: 10px;
    height: 30px;
    line-height: 30px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    background: #fff;
    color: #6772e5;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .025em;
    transition: all .15s ease;
    cursor: pointer;

`

const Row = styled.div`
    display: flex;
`

const Column = styled.div`
    display: flex;
    flex-flow: column;
`

const Text = styled.div`
    margin: 5px;
    padding:5px;
`

class Editor extends Component {

    constructor() {
        super()
        this.state = {
            state: "", // inform user about server interactions
            text: "Start writing",
            size: {
                w: 400,
                h: 100
            },
            oldTexts: [],
            loading: false,
            error: null,
            autoSave: false,
            autoSaveIntervall: 2000,
            intervalId: null
        }
    }


    componentDidMount() {
        this.handleLoad()
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    handleChange = (e) => {
        this.setState({text: e.target.value})
    }

    handleLoad = async () => {
        try {
            // start loading, reset errors
            this.setState({loading: true, error: null})
            const res = await fetch('http://localhost:3001/api/text')
            if(res.ok) {}
            const { text } = await res.json()
            console.log("text from server")
            console.log(text)
            this.setState({text, loading: false})
        } catch(err) {
            this.setState({loading: false, error: err.message})
        }
    }

    handleSave = async () => {
        console.log("save")
        const { text } = this.state
        const body = { text }
        console.log("Body before POST")
        console.log({body})
        try {
            this.setState({loading: true, error: null})
            const res = await fetch('http://localhost:3001/api/text', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const { ok } = await res.json()
            console.log("response after POST")
            console.log({ok})
            this.setState({loading: false})
        } catch(err) {
            this.setState({loading: false, error: err.message})
        }

        if(!this.state.autoSave) {

            const newText = {
                text,
                time: new Date()
            }
            this.setState(({oldTexts}) => ({oldTexts: [newText, ...oldTexts]}))
        }
    }

    toggleAutoSave = () => {
        const { autoSave } = this.state
        if(autoSave) {
            clearInterval(this.state.intervalId)
            this.setState({intervalId: null, autoSave: false })
        } else {
            const { autoSaveIntervall } = this.state
            const intervalId = setInterval(this.handleSave, autoSaveIntervall)
            this.setState({intervalId, autoSave: true })
        }
    }

    render() {
        const {
            size: {w, h},
            text,
            error,
            loading,
            autoSave,
            oldTexts
        } = this.state
        const value = error ? error : loading ? "Loading..." : text

        return (
            <Column>
                <Row>
                    <Button onClick={this.handleLoad}>Load</Button>
                    <Button onClick={this.handleSave}>Save</Button>
                    <Button onClick={this.toggleAutoSave}>Autosave: {autoSave ? "On" : "Off"}</Button>
                </Row>
                <TextArea
                    width={w}
                    height={h}
                    value={value}
                    onChange={this.handleChange}
                />
                {oldTexts.map(oldText => <Text>{oldText.text}</Text>)}

            </Column>
        )
    }
}

export default Editor