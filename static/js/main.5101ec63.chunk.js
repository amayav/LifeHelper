(this["webpackJsonpreact-ts"]=this["webpackJsonpreact-ts"]||[]).push([[0],{16:function(e,t,i){},20:function(e,t,i){},22:function(e,t,i){"use strict";i.r(t);var a=i(3),s=i.n(a),n=i(9),c=i.n(n),r=(i(16),i(11)),l=i(5),o=i(6),d=i(2),h=i(8),m=i(7),u=i(1),_=i(10),p=(i(20),i(0));function j(e){var t=e.columns,i=e.data,a=Object(_.useTable)({columns:t,data:i}),s=a.getTableProps,n=a.getTableBodyProps,c=a.headerGroups,r=a.rows,l=a.prepareRow;return Object(p.jsxs)("table",Object(u.a)(Object(u.a)({},s()),{},{children:[Object(p.jsx)("thead",{children:c.map((function(e){return Object(p.jsx)("tr",Object(u.a)(Object(u.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(p.jsx)("th",Object(u.a)(Object(u.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(p.jsx)("tbody",Object(u.a)(Object(u.a)({},n()),{},{children:r.map((function(e,t){return l(e),Object(p.jsx)("tr",Object(u.a)(Object(u.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(p.jsx)("td",Object(u.a)(Object(u.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))}var b="perfect_support_3",g="perfect_support_2",v="perfect_support_1",O="damage_guard",x="skill_boost",f="encore",k="cinderella_magic",T={time_a:3,time_b:4.5,time_c:6,time_d:7.5,time_e:9},C=function(e){Object(h.a)(i,e);var t=Object(m.a)(i);function i(e){var a;return Object(l.a)(this,i),(a=t.call(this,e)).handleListBoxNameChange=function(e){a.props.changeName(a.props.id,e.target.value)},a.handleInputBoxIntervalChange=function(e){a.props.changeInterval(a.props.id,Number(e.target.value))},a.handleListBoxTimeChange=function(e){a.props.changeTime(a.props.id,e.target.value)},a.handleListBoxNameChange=a.handleListBoxNameChange.bind(Object(d.a)(a)),a.handleInputBoxIntervalChange=a.handleInputBoxIntervalChange.bind(Object(d.a)(a)),a.handleListBoxTimeChange=a.handleListBoxTimeChange.bind(Object(d.a)(a)),a}return Object(o.a)(i,[{key:"render",value:function(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("select",{name:"skill_name_".concat(this.props.id),id:"skill_id_".concat(this.props.id),onChange:this.handleListBoxNameChange,value:this.props.skill.name,children:[Object(p.jsx)("option",{value:b,children:"SSR \u30d1\u30fc\u30d5\u30a7\u30af\u30c8\u30b5\u30dd\u30fc\u30c8"}),Object(p.jsx)("option",{value:g,children:"SR \u30d1\u30fc\u30d5\u30a7\u30af\u30c8\u30b5\u30dd\u30fc\u30c8"}),Object(p.jsx)("option",{value:v,children:"R \u30d1\u30fc\u30d5\u30a7\u30af\u30c8\u30b5\u30dd\u30fc\u30c8"}),Object(p.jsx)("option",{value:O,children:"\u30c0\u30e1\u30fc\u30b8\u30ac\u30fc\u30c9"}),Object(p.jsx)("option",{value:x,children:"\u30b9\u30ad\u30eb\u30d6\u30fc\u30b9\u30c8"}),Object(p.jsx)("option",{value:f,children:"\u30a2\u30f3\u30b3\u30fc\u30eb"}),Object(p.jsx)("option",{value:k,children:"\u30b7\u30f3\u30c7\u30ec\u30e9\u30de\u30b8\u30c3\u30af"}),Object(p.jsx)("option",{value:"other",children:"\u305d\u306e\u4ed6"})]}),Object(p.jsx)("input",{type:"number",id:"interval_id_".concat(this.props.id),name:"interval_name_".concat(this.props.id),min:"1",placeholder:"4",onChange:this.handleInputBoxIntervalChange,value:this.props.skill.interval}),"\u79d2\u3054\u3068",Object(p.jsxs)("select",{name:"time_name_".concat(this.props.id),id:"time_id_".concat(this.props.id),onChange:this.handleListBoxTimeChange,value:this.props.skill.time,children:[Object(p.jsx)("option",{value:"time_a",children:"\u4e00\u77ac\u306e\u9593"}),Object(p.jsx)("option",{value:"time_b",children:"\u308f\u305a\u304b\u306a\u9593"}),Object(p.jsx)("option",{value:"time_c",children:"\u5c11\u3057\u306e\u9593"}),Object(p.jsx)("option",{value:"time_d",children:"\u3057\u3070\u3089\u304f\u306e\u9593"}),Object(p.jsx)("option",{value:"time_e",children:"\u304b\u306a\u308a\u306e\u9593"})]})]})}}]),i}(s.a.Component),F=function(e){Object(h.a)(i,e);var t=Object(m.a)(i);function i(e){var a;Object(l.a)(this,i),(a=t.call(this,e)).last_activated_skill_id=-1,a.current_encore_id_list=[-1,-1,-1,-1,-1],a.idolsData={idol1:null,idol2:null,idol3:null,idol4:null,idol5:null},a.data=[{start:"*",idol1:"*",idol2:"*",idol3:"*",idol4:"*",idol5:"*",perfect:"*",guard:"*"}],a.simple_timeline=[{start:"*",time:"*",mode:"*"}],a.simple_start_time=0,a.simple_previous_mode="",a.perfect_time=-1,a.perfect_ratio=-1,a.no_damage_time=-1,a.no_damage_ratio=-1,a.time_ratio=[{perfect_time:"*",perfect_ratio:"*",no_damage_time:"*",no_damage_ratio:"*"}],a.handleChangeMusicTime=function(e){var t=Number(e.target.value);a.setState({music_time:t}),a.update(a.state.skills,t,a.state.is_resonance)};var s={name:b,interval:9,time:"time_c"};return a.state={skills:[s,s,s,s,s],music_time:120,is_resonance:!1},a.changeName=a.changeName.bind(Object(d.a)(a)),a.changeInterval=a.changeInterval.bind(Object(d.a)(a)),a.changeTime=a.changeTime.bind(Object(d.a)(a)),a.handleChangeMusicTime=a.handleChangeMusicTime.bind(Object(d.a)(a)),a}return Object(o.a)(i,[{key:"getSimpleTimeLine",value:function(){return this.simple_timeline}},{key:"getPerfectTime",value:function(){return this.perfect_time}},{key:"getPerfectRatio",value:function(){return this.perfect_ratio}},{key:"getNoMissTime",value:function(){return this.no_damage_time}},{key:"getNoMissRatio",value:function(){return this.no_damage_ratio}},{key:"is_activated",value:function(e,t,i){return e>=t.interval&&(e-t.interval)%t.interval+.5<=T[t.time]&&e-(e-t.interval)%t.interval<=i-3}},{key:"is_just_activated",value:function(e,t,i){return e>=t.interval&&(e-t.interval)%t.interval===0&&e<=i-3}},{key:"change_simple_mode",value:function(e,t){this.simple_previous_mode!==e&&(this.simple_timeline.push({start:this.simple_start_time.toFixed(1)+" - "+t.toFixed(1),time:(t-this.simple_start_time).toFixed(1),mode:this.simple_previous_mode}),this.simple_previous_mode=e,this.simple_start_time=t)}},{key:"updateTimeLine",value:function(e,t,i,a){for(var s=[],n=4;n>=0;n--)t[n].name===f&&this.is_just_activated(e,t[n],i)&&-1!==this.last_activated_skill_id&&(this.current_encore_id_list[n]=this.last_activated_skill_id);for(var c=4;c>=0;c--)if(this.is_activated(e,t[c],i))if(t[c].name===f){if(-1===this.current_encore_id_list[c])continue;if(t[this.current_encore_id_list[c]].name===k)for(var r=4;r>=0;r--)s.push(t[r].name);else s.push(t[this.current_encore_id_list[c]].name)}else{if(t[c].name===k)for(var l=4;l>=0;l--)s.push(t[l].name);else s.push(t[c].name);this.is_just_activated(e,t[c],i)&&(this.last_activated_skill_id=c)}var o=!1;if(!1===a)o=s.includes(b)&&s.includes(x);else{var d=3*s.filter((function(e){return e===b})).length+2*s.filter((function(e){return e===g})).length+1*s.filter((function(e){return e===v})).length;if(d>0)d+=s.filter((function(e){return e===x})).length;o=d>=4}var h=s.includes(O);!0===o?(this.change_simple_mode("p",e),this.perfect_time+=.5,this.no_damage_time+=.5):!0===h?(this.change_simple_mode("g",e),this.no_damage_time+=.5):this.change_simple_mode("",e);for(var m=[],u=0;u<5;u++)!this.is_activated(e,t[u],i)||t[u].name===f&&-1===this.current_encore_id_list[u]?m[u]="":t[u].name===k||t[u].name===f&&t[this.current_encore_id_list[u]].name===k?m[u]="12345":t[u].name!==f?m[u]=(u+1).toFixed(0):m[u]=(this.current_encore_id_list[u]+1).toFixed(0);return{start:e.toFixed(1)+" - "+(e+.5).toFixed(1),idol1:m[0],idol2:m[1],idol3:m[2],idol4:m[3],idol5:m[4],perfect:o?"p":"-",guard:h?"g":"-"}}},{key:"update",value:function(e,t,i){var a=this;this.last_activated_skill_id=-1,this.current_encore_id_list=[-1,-1,-1,-1,-1],this.simple_timeline=[],this.simple_start_time=0,this.simple_previous_mode="",this.perfect_time=0,this.perfect_ratio=0,this.no_damage_time=0,this.no_damage_ratio=0;var s=Object(r.a)(Array(2*t)).map((function(e,t){return t/2}));this.data=s.map((function(s){return a.updateTimeLine(s,e,t,i)})),this.simple_timeline.push({start:this.simple_start_time.toFixed(1)+" - "+t.toFixed(1),time:(t-this.simple_start_time).toFixed(1),mode:this.simple_previous_mode}),this.perfect_ratio=this.perfect_time/t*100,this.no_damage_ratio=this.no_damage_time/t*100,this.time_ratio=[{perfect_time:this.perfect_time.toFixed(1),perfect_ratio:this.perfect_ratio.toFixed(1),no_damage_time:this.no_damage_time.toFixed(1),no_damage_ratio:this.no_damage_ratio.toFixed(1)}]}},{key:"changeName",value:function(e,t){var i=this.state.skills;i[e-1]=Object(u.a)(Object(u.a)({},this.state.skills[e-1]),{},{name:t}),this.setState({skills:i}),this.update(i,this.state.music_time,this.state.is_resonance)}},{key:"changeInterval",value:function(e,t){var i=this.state.skills;i[e-1]=Object(u.a)(Object(u.a)({},this.state.skills[e-1]),{},{interval:t}),this.setState({skills:i}),this.update(i,this.state.music_time,this.state.is_resonance)}},{key:"changeTime",value:function(e,t){var i=this.state.skills;i[e-1]=Object(u.a)(Object(u.a)({},this.state.skills[e-1]),{},{time:t}),this.setState({skills:i}),this.update(i,this.state.music_time,this.state.is_resonance)}},{key:"render",value:function(){var e=this;this.idolsData={idol1:Object(p.jsx)(C,{skill:this.state.skills[0],id:1,changeName:this.changeName,changeInterval:this.changeInterval,changeTime:this.changeTime}),idol2:Object(p.jsx)(C,{skill:this.state.skills[1],id:2,changeName:this.changeName,changeInterval:this.changeInterval,changeTime:this.changeTime}),idol3:Object(p.jsx)(C,{skill:this.state.skills[2],id:3,changeName:this.changeName,changeInterval:this.changeInterval,changeTime:this.changeTime}),idol4:Object(p.jsx)(C,{skill:this.state.skills[3],id:4,changeName:this.changeName,changeInterval:this.changeInterval,changeTime:this.changeTime}),idol5:Object(p.jsx)(C,{skill:this.state.skills[4],id:5,changeName:this.changeName,changeInterval:this.changeInterval,changeTime:this.changeTime})};var t=function(t){var i=t.target.checked;e.setState({is_resonance:i}),e.update(e.state.skills,e.state.music_time,i)},i=["\u30bb\u30f3\u30bf\u30fc\u52b9\u679c \u30ec\u30be\u30ca\u30f3\u30b9\u30fbXXX \u6709\u52b9\uff1f"],a=function(e){var t=e.id,i=e.value,a=e.checked,s=void 0!==a&&a,n=e.onChange;return Object(p.jsx)("input",{type:"checkbox",id:t,name:"center",checked:s,onChange:n,value:i})},s=function(){return Object(p.jsx)(p.Fragment,{children:i.map((function(i,s){return s+=1,Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("label",{htmlFor:"resonance",children:i}),Object(p.jsx)(a,{id:"center_id_".concat(s),value:i,onChange:t,checked:e.state.is_resonance})]})}))})};return Object(p.jsxs)("p",{children:[i.map((function(e,t){return 1,Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(s,{})})})),Object(p.jsx)(j,{columns:[{Header:"\u30a2\u30a4\u30c9\u30eb4\u7279\u6280",accessor:"idol4"},{Header:"\u30a2\u30a4\u30c9\u30eb2\u7279\u6280",accessor:"idol2"},{Header:"\u30a2\u30a4\u30c9\u30eb1\u7279\u6280",accessor:"idol1"},{Header:"\u30a2\u30a4\u30c9\u30eb3\u7279\u6280",accessor:"idol3"},{Header:"\u30a2\u30a4\u30c9\u30eb5\u7279\u6280",accessor:"idol5"}],data:[this.idolsData]}),"\u697d\u66f2\u6642\u9593\uff08\u6b8b\u308a3\u79d2\u672a\u6e80\u306b\u306a\u308b\u3068\u7279\u6280\u304c\u767a\u52d5\u3057\u306a\u3044\uff09\uff1a",Object(p.jsx)("input",{type:"number",id:"music_time",name:"music_time",onChange:this.handleChangeMusicTime,value:this.state.music_time}),"\u79d2",Object(p.jsx)("div",{children:Object(p.jsx)(j,{columns:[{Header:"PERFECT \u6642\u9593\uff08\u79d2\uff09",accessor:"perfect_time"},{Header:"PERFECT \u7387\uff08%\uff09",accessor:"perfect_ratio"},{Header:"\u30ce\u30fc\u30c0\u30e1 \u6642\u9593\uff08\u79d2\uff09",accessor:"no_damage_time"},{Header:"\u30ce\u30fc\u30c0\u30e1 \u7387\uff08%\uff09",accessor:"no_damage_ratio"}],data:this.time_ratio})}),Object(p.jsx)("div",{className:"table simple",children:Object(p.jsxs)("label",{children:["\u7c21\u6613\u6642\u7cfb\u5217",Object(p.jsx)(j,{columns:[{Header:"\u7d4c\u904e\u6642\u9593\uff08\u79d2\uff09",accessor:"start"},{Header:"\u5224\u5b9a",accessor:"mode"},{Header:"\u7d99\u7d9a\u6642\u9593\uff08\u79d2\uff09",accessor:"time"}],data:this.simple_timeline})]})}),Object(p.jsx)("div",{className:"table detailed",children:Object(p.jsxs)("label",{children:["\u8a73\u7d30\u6642\u7cfb\u5217",Object(p.jsx)(j,{columns:[{Header:"\u7d4c\u904e\u6642\u9593\uff08\u79d2\uff09",accessor:"start"},{Header:"4",accessor:"idol4"},{Header:"2",accessor:"idol2"},{Header:"1",accessor:"idol1"},{Header:"3",accessor:"idol3"},{Header:"5",accessor:"idol5"},{Header:"PERFECT",accessor:"perfect"},{Header:"GUARD",accessor:"guard"}],data:this.data})]})})]})}}]),i}(s.a.Component);var N=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("div",{children:Object(p.jsx)("p",{children:"\u30a2\u30a4\u30c9\u30eb\u30de\u30b9\u30bf\u30fc \u30b9\u30bf\u30fc\u30ea\u30c3\u30c8\u30b7\u30fc\u30ba\u30f3\u597d\u8a55\u767a\u58f2\u4e2d\uff01"})}),Object(p.jsxs)("div",{children:[Object(p.jsx)("p",{children:"\u30a2\u30a4\u30c9\u30eb\u306e\u81ea\u4e3b\u6027\u306b\u4efb\u305b\u308b\u30d7\u30ed\u30c7\u30e5\u30fc\u30b9\u3092\u5fdc\u63f4"}),Object(p.jsx)("p",{children:"\u30c1\u30e5\u30fc\u30cb\u30f3\u30b0 \u306f SR \u30d1\u30fc\u30d5\u30a7\u30af\u30c8\u30b5\u30dd\u30fc\u30c8 \u3068\u540c\u3058"}),Object(p.jsx)("p",{children:"\u30c8\u30ea\u30b3\u30ed\u30fc\u30eb\u30fb\u30b7\u30f3\u30d5\u30a9\u30cb\u30fc \u306f \u30b9\u30ad\u30eb\u30d6\u30fc\u30b9\u30c8 \u3068\u540c\u3058"}),Object(p.jsx)("p",{children:"\u7279\u6280\u30ec\u30d9\u30eb10\u3001\u7279\u6280\u767a\u52d5\u7387 100% \u524d\u63d0"}),Object(p.jsx)("p",{children:"\u672a\u5bfe\u5fdc\uff1a\u30b0\u30e9\u30f3\u30c9\u30e9\u30a4\u30d6"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("p",{children:"\u4f7f\u3063\u305f\u3089\u30b7\u30f3\u30c7\u30ec\u30e9\u30ac\u30fc\u30eb\u30ba\u7dcf\u9078\u6319\u3067\u5c0f\u65e9\u5ddd\u7d17\u679d\u306b\u6295\u7968\u3057\u307e\u3059\u3088\u306d"}),Object(p.jsxs)("p",{children:["\u6319\u52d5\u304c\u304a\u304b\u3057\u3044\u3068\u601d\u3063\u305f\u308a\u8981\u671b\u304c\u3042\u3063\u305f\u308a\u3057\u305f\u3089",Object(p.jsx)("a",{href:"https://github.com/amayav/LifeHelper",children:"\u30bd\u30fc\u30b9\u30b3\u30fc\u30c9"}),"\u3092\u81ea\u5206\u3067\u3044\u3058\u3063\u3066\u306d"]}),Object(p.jsx)("p",{children:"\u30bd\u30fc\u30b9\u30b3\u30fc\u30c9\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u8a2d\u3051\u3066\u306a\u3044\u3088"})]}),Object(p.jsx)(F,{})]})})},H=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,23)).then((function(t){var i=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,c=t.getTTFB;i(e),a(e),s(e),n(e),c(e)}))};c.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(N,{})}),document.getElementById("root")),H()}},[[22,1,2]]]);
//# sourceMappingURL=main.5101ec63.chunk.js.map