import React, { Component } from 'react';
import styled from 'styled-components'

const TextArea = styled.textarea`
    width: ${props => props.width + 'px'};
    height: ${props => props.height + 'px'};
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    
    width: 5rem;
    height: 2rem;
    
    cursor: pointer;

`

const Row = styled.div`
    display: flex;

`

class Editor extends Component {

    state = {
        state: "", // inform user about server interactions
        text: "Start writing",
        size: {
            w: 500,
            h: 200
        }
    }


    handleChange = (e) => {
        console.log(e.target.value)
        //this.
    }

    handleLoad = () => {
        console.log("save clicked")
    }

    handleSave = () => {
        console.log("load clicked")
    }


    render() {

        const {size: {w, h}, text} = this.state

        return (
            <div>
                <div>Editor</div>
                <div>{`Breite: ${w} Höhe: ${h}`}</div>
                <Row>
                    <Button onClick={this.handleLoad}>Load</Button>
                    <Button onClick={this.handleSave}>Save</Button>
                </Row>
                <TextArea
                    width={w}
                    height={h}
                    value={text}
                    onChange={this.handleChange}
                    onResize={() => console.log("test")}

                />
            </div>
        )
    }
}

export default Editor