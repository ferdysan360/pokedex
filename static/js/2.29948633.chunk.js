(this.webpackJsonppokedex=this.webpackJsonppokedex||[]).push([[2],{107:function(n,e,t){"use strict";t.r(e);var a=t(26),c=t(27),i=t(37),r=t(0);function o(){var n=window;return{width:n.innerWidth,height:n.innerHeight}}var b,s,d,l,u,j,p=t(82),O=t(15),m=t(79),h=t(35),f=t(36),x=t(4);e.default=function(n){var e=n.pokemon,t=n.countFunction,g=n.detailsFunction,v=n.releaseFunction,w=n.index,k=function(){var n=Object(r.useState)(o()),e=Object(i.a)(n,2),t=e[0],a=e[1];return Object(r.useEffect)((function(){function n(){a(o())}return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}}),[]),t}().width,z=Object(c.a)(b||(b=Object(a.a)(["\n        display: flex;\n        justify-content: center;\n        align-items: space-evenly;\n        flex-direction: column;\n        min-height: 100px;\n        margin: 10px;\n        padding: 10px;\n        border-radius: 8px;\n        background-color: white;\n        box-shadow: 5px 10px 18px #888888;\n        font-size: 20px;\n        word-break: break-all;\n    "]))),C=k<520?Object(c.a)(s||(s=Object(a.a)(["\n            width: 100%;\n        "]))):Object(c.a)(d||(d=Object(a.a)(["\n            min-width: 200px;\n        "]))),y=Object(c.a)(l||(l=Object(a.a)(["\n        font-size: 14px;\n        margin: 5px 0px;\n    "]))),E=Object(c.a)(u||(u=Object(a.a)(["\n        color: #828282;\n        font-size: 24px;\n        font-weight: 700;\n    "]))),F=Object(c.a)(j||(j=Object(a.a)(["\n        margin: 5px 0px;\n    "]))),J=Object(O.a)((function(n){return{root:{"border-color":h.a[700],"&:hover":{color:h.a[50],backgroundColor:h.a[900]}}}}))(p.a),L=Object(O.a)((function(n){return{root:{color:n.palette.getContrastText(f.a[600]),backgroundColor:f.a[600],"&:hover":{backgroundColor:f.a[900]}}}}))(p.a),N=Object(m.a)((function(n){return{margin:{margin:n.spacing(.5)}}}))();return Object(x.c)("div",{css:[z,C],children:[e.nickname?Object(x.b)("div",{css:E,children:e.nickname}):Object(x.b)(x.a,{}),e.name?Object(x.b)("div",{css:F,children:e.name}):Object(x.b)(x.a,{}),t?Object(x.b)("div",{css:y,children:"caught: ".concat(t(e.name))}):Object(x.b)(x.a,{}),g?Object(x.b)(J,{size:"small",variant:"outlined",color:"primary",className:N.margin,onClick:function(){g(e.name)},children:"Details"}):Object(x.b)(x.a,{}),v?Object(x.b)(L,{size:"small",variant:"contained",color:"primary",className:N.margin,onClick:function(){v(e.name,w)},children:"Release"}):Object(x.b)(x.a,{})]})}}}]);
//# sourceMappingURL=2.29948633.chunk.js.map