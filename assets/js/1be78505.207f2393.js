(self.webpackChunk_use_grid_docs=self.webpackChunk_use_grid_docs||[]).push([[514,489],{74696:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Ce}});var a=n(2784),l=n(30876),r=n(37614),o=n(37647),i=n(27902),c=n(7560),s=n(98283),d=n(6277),u=n(87510),m=n(85862),p=n(43157),h=n(81233),b=n(42391),f=n(21510),g=n(71344),v=n(73578),E=function(e){return a.createElement("svg",(0,c.Z)({width:"20",height:"20",role:"img"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))},y=n(88013),k=n(17921),_="sidebar_AUih",C="sidebarWithHideableNavbar_13bV",Z="sidebarHidden_d9AY",N="sidebarLogo_f7Rp",S="menu_16eN",I="menuLinkText_2jnp",x="menuWithAnnouncementBar_283y",B="collapseSidebarButton_253t",T="collapseSidebarButtonIcon_Gq9h",A="sidebarMenuIcon_1r51",L="sidebarMenuCloseIcon_34YW",j="menuLinkExternal_3oZa",R=["items"],w=["item","onItemClick","collapsible","activePath"],P=["item","onItemClick","activePath","collapsible"];var M=function e(t,n){return"link"===t.type?(0,u.Mg)(t.href,n):"category"===t.type&&t.items.some((function(t){return e(t,n)}))},D=(0,a.memo)((function(e){var t=e.items,n=(0,s.Z)(e,R);return t.map((function(e,t){return a.createElement(F,(0,c.Z)({key:t,item:e},n))}))}));function F(e){switch(e.item.type){case"category":return a.createElement(W,e);case"link":default:return a.createElement(H,e)}}function W(e){var t,n,l,r=e.item,o=e.onItemClick,i=e.collapsible,u=e.activePath,m=(0,s.Z)(e,w),p=r.items,h=r.label,b=M(r,u),f=(n=b,l=(0,a.useRef)(n),(0,a.useEffect)((function(){l.current=n}),[n]),l.current),g=(0,a.useState)((function(){return!!i&&(!b&&r.collapsed)})),v=g[0],E=g[1],y=(0,a.useRef)(null),k=(0,a.useState)(void 0),_=k[0],C=k[1],Z=function(e){var t;void 0===e&&(e=!0),C(e?(null==(t=y.current)?void 0:t.scrollHeight)+"px":void 0)};(0,a.useEffect)((function(){b&&!f&&v&&E(!1)}),[b,f,v]);var N=(0,a.useCallback)((function(e){e.preventDefault(),_||Z(),setTimeout((function(){return E((function(e){return!e}))}),100)}),[_]);return 0===p.length?null:a.createElement("li",{className:(0,d.Z)("menu__list-item",{"menu__list-item--collapsed":v})},a.createElement("a",(0,c.Z)({className:(0,d.Z)("menu__link",(t={"menu__link--sublist":i,"menu__link--active":i&&b},t[I]=!i,t)),onClick:i?N:void 0,href:i?"#!":void 0},m),h),a.createElement("ul",{className:"menu__list",ref:y,style:{height:_},onTransitionEnd:function(){v||Z(!1)}},a.createElement(D,{items:p,tabIndex:v?"-1":"0",onItemClick:o,collapsible:i,activePath:u})))}function H(e){var t,n=e.item,l=e.onItemClick,r=e.activePath,o=(e.collapsible,(0,s.Z)(e,P)),i=n.href,u=n.label,m=M(n,r);return a.createElement("li",{className:"menu__list-item",key:u},a.createElement(f.Z,(0,c.Z)({className:(0,d.Z)("menu__link",(t={"menu__link--active":m},t[j]=!(0,g.Z)(i),t)),to:i},(0,g.Z)(i)&&{isNavLink:!0,exact:!0,onClick:l},o),u))}function O(e){var t=e.onClick;return a.createElement("button",{type:"button",title:(0,k.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,k.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,d.Z)("button button--secondary button--outline",B),onClick:t},a.createElement(E,{className:T}))}function U(e){var t=e.responsiveSidebarOpened,n=e.onClick;return a.createElement("button",{"aria-label":t?(0,k.I)({id:"theme.docs.sidebar.responsiveCloseButtonLabel",message:"Close menu",description:"The ARIA label for close button of mobile doc sidebar"}):(0,k.I)({id:"theme.docs.sidebar.responsiveOpenButtonLabel",message:"Open menu",description:"The ARIA label for open button of mobile doc sidebar"}),"aria-haspopup":"true",className:"button button--secondary button--sm menu__button",type:"button",onClick:n},t?a.createElement("span",{className:(0,d.Z)(A,L)},"\xd7"):a.createElement(y.Z,{className:A,height:24,width:24}))}var z=function(e){var t,n,l=e.path,r=e.sidebar,o=e.sidebarCollapsible,i=void 0===o||o,c=e.onCollapse,s=e.isHidden,f=function(){var e=(0,m.Z)().isAnnouncementBarClosed,t=(0,a.useState)(!e),n=t[0],l=t[1];return(0,b.Z)((function(t){var n=t.scrollY;e||l(0===n)})),n}(),g=(0,u.LU)(),E=g.navbar.hideOnScroll,y=g.hideableSidebar,k=(0,m.Z)().isAnnouncementBarClosed,I=function(){var e=(0,a.useState)(!1),t=e[0],n=e[1];(0,p.Z)(t);var l=(0,h.Z)();return(0,a.useEffect)((function(){l===h.D.desktop&&n(!1)}),[l]),{showResponsiveSidebar:t,closeResponsiveSidebar:(0,a.useCallback)((function(e){e.target.blur(),n(!1)}),[n]),toggleResponsiveSidebar:(0,a.useCallback)((function(){n((function(e){return!e}))}),[n])}}(),B=I.showResponsiveSidebar,T=I.closeResponsiveSidebar,A=I.toggleResponsiveSidebar;return a.createElement("div",{className:(0,d.Z)(_,(t={},t[C]=E,t[Z]=s,t))},E&&a.createElement(v.Z,{tabIndex:-1,className:N}),a.createElement("div",{className:(0,d.Z)("menu","menu--responsive","thin-scrollbar",S,(n={"menu--show":B},n[x]=!k&&f,n))},a.createElement(U,{responsiveSidebarOpened:B,onClick:A}),a.createElement("ul",{className:"menu__list"},a.createElement(D,{items:r,onItemClick:T,collapsible:i,activePath:l}))),y&&a.createElement(O,{onClick:c}))},V=n(26540);var $=n(84501),q=n.n($),K={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},Y=n(66097),X=function(){var e=(0,u.LU)().prism,t=(0,Y.Z)().isDarkTheme,n=e.theme||K,a=e.darkTheme||n;return t?a:n},G="codeBlockContainer_2jEK",J="codeBlockContent_115_",Q="codeBlockTitle_1WOR",ee="codeBlock_1XLE",te="codeBlockWithTitle_2SXk",ne="copyButton_3nrq",ae="codeBlockLines_2ir3",le=/{([\d,-]+)}/,re=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},n=["highlight-next-line","highlight-start","highlight-end"].join("|"),a=e.map((function(e){return"(?:"+t[e].start+"\\s*("+n+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+a+")\\s*$")};function oe(e){var t=e.children,n=e.className,l=e.metastring,r=e.title,o=(0,u.LU)().prism,i=(0,a.useState)(!1),s=i[0],m=i[1],p=(0,a.useState)(!1),h=p[0],b=p[1];(0,a.useEffect)((function(){b(!0)}),[]);var f=(0,u.bc)(l)||r,g=(0,a.useRef)(null),v=[],E=X(),y=Array.isArray(t)?t.join(""):t;if(l&&le.test(l)){var _=l.match(le)[1];v=q()(_).filter((function(e){return e>0}))}var C=n&&n.replace(/language-/,"");!C&&o.defaultLanguage&&(C=o.defaultLanguage);var Z=y.replace(/\n$/,"");if(0===v.length&&void 0!==C){for(var N,S="",I=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return re(["js","jsBlock"]);case"jsx":case"tsx":return re(["js","jsBlock","jsx"]);case"html":return re(["js","jsBlock","html"]);case"python":case"py":return re(["python"]);default:return re()}}(C),x=y.replace(/\n$/,"").split("\n"),B=0;B<x.length;){var T=B+1,A=x[B].match(I);if(null!==A){switch(A.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":S+=T+",";break;case"highlight-start":N=T;break;case"highlight-end":S+=N+"-"+(T-1)+","}x.splice(B,1)}else B+=1}v=q()(S),Z=x.join("\n")}var L=function(){!function(e,{target:t=document.body}={}){const n=document.createElement("textarea"),a=document.activeElement;n.value=e,n.setAttribute("readonly",""),n.style.contain="strict",n.style.position="absolute",n.style.left="-9999px",n.style.fontSize="12pt";const l=document.getSelection();let r=!1;l.rangeCount>0&&(r=l.getRangeAt(0)),t.append(n),n.select(),n.selectionStart=0,n.selectionEnd=e.length;let o=!1;try{o=document.execCommand("copy")}catch{}n.remove(),r&&(l.removeAllRanges(),l.addRange(r)),a&&a.focus()}(Z),m(!0),setTimeout((function(){return m(!1)}),2e3)};return a.createElement(V.ZP,(0,c.Z)({},V.lG,{key:String(h),theme:E,code:Z,language:C}),(function(e){var t,n=e.className,l=e.style,r=e.tokens,o=e.getLineProps,i=e.getTokenProps;return a.createElement("div",{className:G},f&&a.createElement("div",{style:l,className:Q},f),a.createElement("div",{className:(0,d.Z)(J,C)},a.createElement("div",{tabIndex:0,className:(0,d.Z)(n,ee,"thin-scrollbar",(t={},t[te]=f,t))},a.createElement("div",{className:ae,style:l},r.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var n=o({line:e,key:t});return v.includes(t+1)&&(n.className=n.className+" docusaurus-highlight-code-line"),a.createElement("div",(0,c.Z)({key:t},n),e.map((function(e,t){return a.createElement("span",(0,c.Z)({key:t},i({token:e,key:t})))})))})))),a.createElement("button",{ref:g,type:"button","aria-label":(0,k.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,d.Z)(ne),onClick:L},s?a.createElement(k.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):a.createElement(k.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var ie="enhancedAnchor_b0Ka",ce=["id"],se=function(e){return function(t){var n,l=t.id,r=(0,s.Z)(t,ce),o=(0,u.LU)().navbar.hideOnScroll;return l?a.createElement(e,r,a.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,d.Z)("anchor",(n={},n[ie]=!o,n)),id:l}),r.children,a.createElement("a",{className:"hash-link",href:"#"+l,title:(0,k.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):a.createElement(e,r)}},de={code:function(e){var t=e.children;return(0,a.isValidElement)(t)?t:t.includes("\n")?a.createElement(oe,e):a.createElement("code",e)},a:function(e){return a.createElement(f.Z,e)},pre:function(e){var t,n=e.children;return(0,a.isValidElement)(null==n||null==(t=n.props)?void 0:t.children)?null==n?void 0:n.props.children:a.createElement(oe,(0,a.isValidElement)(n)?null==n?void 0:n.props:{children:n})},h1:se("h1"),h2:se("h2"),h3:se("h3"),h4:se("h4"),h5:se("h5"),h6:se("h6")},ue=n(2489),me=n(4517),pe="docPage_2hm3",he="docMainContainer_luF8",be="docMainContainerEnhanced_1KzL",fe="docSidebarContainer_mF8j",ge="docSidebarContainerHidden_2DZs",ve="collapsedDocSidebar_3YtF",Ee="expandSidebarButtonIcon_2vqf",ye="docItemWrapperEnhanced_1BzV",ke="docItemWrapper_12Bq";function _e(e){var t,n,o,c,s,m=e.currentDocRoute,p=e.versionMetadata,h=e.children,b=(0,r.default)(),f=b.siteConfig,g=b.isClient,v=p.pluginId,y=p.permalinkToSidebar,_=p.docsSidebars,C=p.version,Z=y[m.path],N=_[Z],S=(0,a.useState)(!1),I=S[0],x=S[1],B=(0,a.useState)(!1),T=B[0],A=B[1],L=(0,a.useCallback)((function(){T&&A(!1),x(!I)}),[T]);return a.createElement(i.Z,{key:g,wrapperClassName:u.kM.wrapper.docPages,pageClassName:u.kM.page.docPage,searchMetadatas:{version:C,tag:(0,u.os)(v,C)}},a.createElement("div",{className:pe},N&&a.createElement("div",{className:(0,d.Z)(fe,(t={},t[ge]=I,t)),onTransitionEnd:function(e){e.currentTarget.classList.contains(fe)&&I&&A(!0)},role:"complementary"},a.createElement(z,{key:Z,sidebar:N,path:m.path,sidebarCollapsible:null==(n=null==(o=f.themeConfig)?void 0:o.sidebarCollapsible)||n,onCollapse:L,isHidden:T}),T&&a.createElement("div",{className:ve,title:(0,k.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,k.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:L,onClick:L},a.createElement(E,{className:Ee}))),a.createElement("main",{className:(0,d.Z)(he,(c={},c[be]=I||!N,c))},a.createElement("div",{className:(0,d.Z)("container padding-vert--lg",ke,(s={},s[ye]=I,s))},a.createElement(l.Zo,{components:de},h)))))}var Ce=function(e){var t=e.route.routes,n=e.versionMetadata,l=e.location,r=t.find((function(e){return(0,me.LX)(l.pathname,e)}));return r?a.createElement(_e,{currentDocRoute:r,versionMetadata:n},(0,o.Z)(t)):a.createElement(ue.default,e)}},2489:function(e,t,n){"use strict";n.r(t);var a=n(2784),l=n(27902),r=n(17921);t.default=function(){return a.createElement(l.Z,{title:"Page Not Found"},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(r.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(r.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(r.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},84501:function(e,t){function n(e){let t,n=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))n.push(parseInt(a,10));else if(t=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,l,r]=t;if(a&&r){a=parseInt(a),r=parseInt(r);const e=a<r?1:-1;"-"!==l&&".."!==l&&"\u2025"!==l||(r+=e);for(let t=a;t!==r;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);