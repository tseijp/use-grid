import axios from 'axios';
import React from 'react';
//import Radium from 'radium';
import {MDBRow} from 'mdbreact';
import {withCookies} from 'react-cookie';
import {animateScroll} from 'react-scroll';
//containers
import Pill     from '../components/Pill';
import Layout   from '../components/Layout';
import NoteHead from './NoteHead';
import NoteCard from './NoteCard';
import NoteTail from './NoteTail';

class Note extends React.Component {
    url = window.location.origin.match('localhost')?"http://localhost:8000/":"https://tsei.jp/"
    ///*************** for React ***********************/
    constructor (props) {
        super();
        const authtoken = props.cookies.get('authtoken');
        const urlId = window.location.pathname.replace(/\//g,'').replace('note','');
        const topNoteId = /^([1-9]\d*|0)$/.test(urlId)?urlId:null;
        const headers = { "Content-Type":"application/json",
                    ...(authtoken&&{Authorization:`Token ${authtoken}`})};
        const context = { isDark:false, tag:null, lang :'ja', status:null,
                          topUser:topNoteId?null:urlId,requestUser:null,
                          topNoteId, topNoteUser:null, bottomNoteId:null,
                          isAuth:authtoken?true:false, isHome:topNoteId?false:true,};
        this.state = { authtoken, headers, context, noteCards:[], }
        this.getCard   = this.getCard.bind(this);
        this.postCard  = this.postCard.bind(this);
    }
    componentDidMount () {
        //if (this.state.authtoken)
        return this.getCard(this.state.context.topNoteId||this.state.context.topUser);
        //window.location.href = '/user'
    }
    ///*************** for state ***********************/
    setCard(cards, mode='init'){ //get => init=true // add or edit => init=false
        const noteCards = (cards instanceof Array)?[...cards]:[cards]
        const pre_cards = [...this.state.noteCards];
        const new_cards = noteCards.filter(n=>pre_cards.filter(p=>n.id===p.id).length===0)
        //this.setState({noteCards:[]}) // reset noteCards keys in state
        const bottomNoteId = this.state.context.isHome?null:(mode==='head'?pre_cards:noteCards).slice(-1)[0].id;
        this.setState({ noteCards : (mode==='init')?noteCards :
            [...(mode==='head'?new_cards:[]),
             ...pre_cards.map(card=>noteCards.find(c=>c.id===card.id)||card ),
             ...(mode==='tail'?new_cards:[]),],
            context:{...this.state.context, bottomNoteId},
        })
        if (mode==='tail')
            return animateScroll.scrollToBottom();
    };
    deleteCard(id){
        if ( id===this.state.context.topNoteId )
            return this.getCard();
        this.setState({noteCards:this.state.noteCards.filter(n=>n.id!==id)});
    };
    ///*************** for API ***********************/
    getCard (id=null) {
        const url = `${this.url}api/note/${ id?id+'/':'' }`
        const headers = this.state.headers;
        axios.get(url,{headers}).then(res=>{
            if(res.status===200){
                const topNote = id&&res.data.find(v=>""+v.id===""+id);
                const topNoteId = (id&&topNote&&/^([1-9]\d*|0)$/.test(topNote.id))?topNote.id:null;
                const topNoteUser = (id&&topNote)?topNote.posted_user:null;
                const topUser     = (id&&!topNoteId)?id:null
                const requestUser = res.data[0]?res.data[0].request_user.username:null
                const context = {...this.state.context,topNoteId,topNoteUser,topUser,requestUser,isHome:topNoteId?false:true}
                window.history.replaceState('','',`/note/${id?id+'/':''}`);
                this.setState({context});
                this.setCard(res.data);
            };//console.log('get', res);
        }).catch(err=>{console.log(err)})
    };
    postCard(id=null, body=null){
        if (!this.state.context.isAuth)
            return this.setState({context:{...this.state.context, status:500}})
        const url = `${this.url}api/note/${id?id+'/ajax/':''}`
        const data = body || {"delete_note":true}
        const headers = this.state.headers;
        axios.post(url,data,{headers}).then(res=>{
            if(res.status===201){//add(null,{note_object:null}) or edit (321,{enText:'hello'})
                const isAdd = Object.keys(data).map(v=>v==="note_object").every(v=>v===true)
                const isHome = this.state.context.isHome;
                if(body===null){ this.deleteCard(id) ;};
                if(body!==null && isAdd){ this.setCard(res.data, isHome?'head':'tail');};
            };//console.log('post',res);
        }).catch(err=>console.log(err))
    }
    ///*************** for Render ***********************/
    render(){
        const s = this.state;
        const nowURL = window.location.origin + window.location.pathname
        const shareText = s.context.topNoteUser?`by ${s.context.topNoteUser.username}`:''
        const hatebURL = `https://b.hatena.ne.jp/entry/${nowURL}`
        const tweetURL = `https://twitter.com/intent/tweet?url=${nowURL}&text=${shareText}`;
        const fbookURL = `https://www.facebook.com/sharer/sharer.php?u=${nowURL}`
        return (
            <Layout {...s.context}
                toJa={()=>this.setState({context:{...this.state.context, lang:'ja'}})}
                toEn={()=>this.setState({context:{...this.state.context, lang:'en'}})}>
                <NoteHead
                    {...s.context}
                    getCard={this.getCard}
                    postCard={this.postCard}/>
                <MDBRow>
                {this.state.noteCards.length?this.state.noteCards.map((note,j)=>
                    <NoteCard {...note} {...s.context}
                        key={`card${note.id}`}
                        getCard={this.getCard}
                        postCard={this.postCard}
                        deleteCard={this.deleteCard}/>
                ):
                <div className="spinner-grow" style={{width:"50vw",height:"50vw", margin:"0 auto"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                }
                </MDBRow>
                <NoteTail
                    {...s.context}
                    getCard={this.getCard}
                    postCard={this.postCard} />
                <Pill icon='ellipsis-h' open='onMouseEnter'>
                    <Pill icon='share-square'>
                        <Pill icon='bold'      onClick={()=>{window.open(hatebURL,"_blank")}}/>
                        <Pill fab='twitter'    onClick={()=>{window.open(tweetURL,"_blank")}}/>
                        <Pill fab='facebook-f' onClick={()=>{window.open(fbookURL,"_blank")}}/>
                    </Pill>
                    {s.context.isAuth?
                    <Pill icon={s.context.isHome?'plus':'comment'}
                        onClick={()=>this.postCard(null,{'note_object':s.context.topNoteId})}/>
                    : <Pill icon="sign-in-alt"onClick={()=>{window.location.href="/user"}}/> }
                    <Pill icon="location-arrow" onClick={()=>null}>
                        <Pill icon="angle-up"   onClick={()=>animateScroll.scrollToTop()}/>
                        <Pill icon="home"       onClick={()=>this.getCard()}/>
                        {(this.state.context.requestUser)?
                            <Pill icon="user-alt"   onClick={()=>this.getCard(this.state.context.requestUser)}/>:
                            <Pill icon="user-alt"   onClick={()=>this.getCard('tseijp')}/>
                        }
                        <Pill icon="angle-down" onClick={()=>animateScroll.scrollToBottom()}/>
                    </Pill>
                </Pill>
            </Layout>
        );
    }
}

export default withCookies(Note);
