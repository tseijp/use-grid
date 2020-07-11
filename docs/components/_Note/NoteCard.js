import React from 'react';
import Radium from 'radium';
import Mdmd from '@tsei/mdmd';/*
card and (homecard or postedcard)
_____________
|cardbody    |
|  cardembed |
|------------|
|  cardhover |
|____________|
*/
//import Canvas from './NoteCard/Canvas.js';
import Icon  from '../components/Icon';
import Heading  from '../components/Heading';
import {MDBCol, MDBRow, MDBInput} from 'mdbreact';

class NoteCard extends React.Component {
    constructor (props) {
        super();
        const getEqualUser =(u1,u2)=>(u1&&u2)?['id','username'].every(k=>u1[k]===u2[k]):false;
        const isNoteMain = getEqualUser(props.posted_user, props.topNoteUser) || props.isHome;
        const isNoteAuth = getEqualUser(props.posted_user, props.request_user);
        //console.log(`[auth in constructor]:${isNoteAuth}`, props.request_user, props.posted_user);
        this.state = {...props, isNoteMain, isNoteAuth, isChanged:false, nowHeight:0};
        this.embedRef = React.createRef();
        this.clickTrash = this.clickTrash.bind(this);
    }
    componentDidMount(){
        const firstHeight=this.embedRef.current?this.embedRef.current.clientHeight:0;
        if (firstHeight!==0 && firstHeight!==this.state.firstHeight);
            this.setState({firstHeight});
        this.timerID = setInterval(() => {
            if(this.state.isChanged){
                const key = `${this.props.lang}_text`;
                const body = {[key]:this.state[key]};
                this.props.postCard(this.props.id, body);
                this.setState({isChanged:false});
            }
        }, 10000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    clickEdit () {}
    clickTrash(){this.props.postCard(this.props.id)}
    clickComment () {}
    clickHeart () {}
    clickEye(){}
    editText (text) {
        const pre = this.state[`${this.props.lang}_text`];
        const body = {[`${this.props.lang}_text`] : text};
        if (pre!==text){ this.setState({...body, isChanged:true}); }
    }
    render () {
        const media =d=>'@media '+Object.entries(d).map(v=>`(${v[0]}-width:${v[1]}px)`).join(' and ');
        const shadow=a=>`${a[0]}px ${a[1]}px ${a[2]}px rgba(0,0,0,${a[3]})`;
        const s = this.state;
        const p = this.props;
        const isEditable = (!p.isHome && s.isNoteAuth);
        const firstHeight= this.state.firstHeight?this.state.firstHeight+50:50;
        const nowHeight  = this.embedRef.current?this.embedRef.current.clientHeight+50:firstHeight;
        const minHeight  = (this.props.isHome)?450:(this.state.isNoteMain?700:250);
        const cardHeight = (this.props.isHome||minHeight>nowHeight)?minHeight:nowHeight;
        //console.log(`[height in render]\tid:${s.id} isHome:${p.isHome},\t now:${nowHeight} ${(nowHeight>minHeight?">":"<")} min:${minHeight}`)
        const styles = {
            card:{ cursor:"pointer", transition: "1.5s", overflow:"hidden",//position:"relative",
            ...(p.isHome
              ?{[media({max:576})]        :{width :   "95%",borderRadius:"16px", margin:"16px auto",},
                [media({min:576,max:768})]:{width : "500px",borderRadius:"20px", margin:"20px auto",},
                [media({min:768})]        :{width : "500px",borderRadius:"25px", margin:"25px auto",},}//home
              :{[media({max:576})]        :{width :  "100%",borderRadius:"20px", margin:"20px auto",},
                [media({min:576,max:768})]:{width : "500px",borderRadius:"20px", margin:"20px auto",},
                [media({min:768})]        :{width : "750px",borderRadius:"25px", margin:"25px auto",},}),
                        height:`${cardHeight}px`                     ,boxShadow:shadow([0,1,50,.2]),
              ':hover':{height:`${cardHeight + (isEditable?250:0)}px`,boxShadow:shadow([0,5,10,.4]), },},//card
            mdmd:{...(p.isHome?{height:"400px"}:{minHeight:s.isNoteMain?'650px':'150px'}),
                    overflow:"hidden", fontSize:"20px",
                [media({max:576})]        :{fontSize:"16px",},
                [media({min:576,max:768})]:{fontSize:"18px",},
                [media({min:768})]        :{fontSize:"20px",},
            },
        };
        const mdmdStyles = {
            color         :"elegant-color",
            imageStyle    :{position:"absolute"},
            styleRoot     :{padding:"0 0 0 0"},
            styleListItem :{padding:"0 50px"},
            styleParagraph:{padding:"0 25px 0 25px"},
            renderers     :{heading:props=>
                <Heading {...props}
                    getCard={p.getCard} isHome={p.isHome}
                    username={this.state.posted_user.username}/>,},
        };
        return (
            <MDBCol style={ {transition:"1.75s"} } xl={p.isHome?"6":"12"}>
                <div style={ styles.card }>
                    <div ref={this.embedRef} style={styles.mdmd}
                         onClick={p.isHome?()=>p.getCard(s.id):null}>
                        <Mdmd {...mdmdStyles} source={s[`${p.lang}_text`]}/>
                    </div>
                    <MDBRow style={{margin:"0 0",padding:"0 0"}}>
                        {isEditable&& <Icon fas="edit" click={this.clickEdit}></Icon>}
                        <Icon far="comment" click={this.clickComment}></Icon>
                        <Icon far="eye"     click={this.clickEye}>{s.id}</Icon>
                        <Icon far="heart"   click={this.clickHeart}  ></Icon>
                        {isEditable&& <Icon fas="trash"click={this.clickTrash}></Icon>}
                    </MDBRow>
                    {isEditable&&
                    <MDBInput type="textarea" rows="7" style={{padding:"25px"}}
                        label={`${p.lang} ${s.isNoteMain?'text':'comment'}`}
                        value={s[`${p.lang}_text`]? s[`${p.lang}_text`]:'#'}
                        onChange={(e)=>this.editText(e.target.value)} />    }
                </div>
            </MDBCol>
        )
    }
}
export default Radium(NoteCard);
