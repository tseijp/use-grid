import React from 'react';
import Radium from 'radium';
import { MDBBtn } from "mdbreact";

class NoteTail extends React.Component{
    click() {
        const body = {'note_object':this.props.topNoteId}
        this.props.postCard(null, body)
    }
    render(){
        const media =d=>'@media '+Object.entries(d).map(v=>`(${v[0]}-width:${v[1]}px)`).join(' and ')
        const styles = {
            tail  :{padding:"25px 25px 10px 10px",transition:"0.75s",
                    margin:"auto auto", textAlign:"center",
                    [media({        max:576})]:{fontSize:"50px",},
                    [media({min:576,max:768})]:{fontSize:"50px",},
                    [media({min:768        })]:{fontSize:"75px",},},
            button:{padding:"5px 30px 5px 30px",margin:"0 auto", borderRadius:"250px",
                    textAlign:"center",fontSize:"50px",},
        }
        const p = this.props;
        return (
            <div style={styles.tail}>
                {(p.isAuth && !p.isHome && p.topNoteUser) &&
                <MDBBtn style={styles.button} size="sm" color="dark"
                    onClick={()=>this.click()}>
                    +</MDBBtn>
            }
            </div>
        )
    }
}

export default Radium(NoteTail);
