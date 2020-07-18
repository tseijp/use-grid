export interface NoteProps {source?:string}
export interface BasedProps {width?:number,size?:number,color?:string}
export interface BindsProps extends BasedProps{bind?:any,spring?:any,}
export interface SidesProps extends BasedProps{onOpen?:()=>void,}
export interface TransProps extends BasedProps{onOpen?:()=>void,}
export interface NotesProps extends BasedProps{}
