module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=32)}([function(e,t){e.exports=require("react")},function(e,t,n){e.exports=n(34)()},function(e,t){e.exports=require("@material-ui/core/Button")},function(e,t){e.exports=require("@material-ui/icons/Edit")},function(e,t){e.exports=require("@material-ui/icons/ChevronRight")},function(e,t){e.exports=require("@material-ui/icons/Clear")},function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return ue});var r=n(0),o=n.n(r),i=n(1),a=n.n(i),c=n(7),u=n.n(c),l=n(8),s=n.n(l),f=n(9),p=n.n(f),d=n(10),m=n.n(d),h=n(11),y=n.n(h),b=n(2),v=n.n(b),g=n(3),O=n.n(g),S=n(12),C=n.n(S),x=n(13),w=n.n(x),E=n(14),P=n.n(E),q=n(15),j=n.n(q),A=n(16),D=n.n(A),_=n(17),T=n.n(_),R=n(4),k=n.n(R),M=n(5),F=n.n(M),L=n(18),X=n.n(L),V=n(19),I=n.n(V),U=n(20),B=n.n(U),N=n(21),W=n.n(N),z=n(22),H=n.n(z),K=n(23),Y=n.n(K),G=n(24),J=n.n(G),Q=n(25),Z=n.n(Q),$=n(26);function ee(e){return(ee="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){ae(e,t,n[t])})}return e}function ne(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function re(e){return(re=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ie(e,t){return(ie=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ae(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ce={Add:P.a,Check:D.a,Clear:F.a,Delete:X.a,DetailPanel:k.a,Edit:O.a,Export:Y.a,Filter:I.a,FirstPage:B.a,LastPage:W.a,NextPage:k.a,PreviousPage:T.a,ResetSearch:F.a,Search:J.a,SortArrow:j.a,ThirdStateCheck:H.a,ViewColumn:Z.a},ue=function(t){function n(){var t,r,i,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);for(var c=arguments.length,u=new Array(c),l=0;l<c;l++)u[l]=arguments[l];return i=this,a=(t=re(n)).call.apply(t,[this].concat(u)),r=!a||"object"!==ee(a)&&"function"!=typeof a?oe(i):a,ae(oe(r),"state",{openConfirmDelete:!1,idDelete:null}),ae(oe(r),"dialogEdit",o.a.createRef()),ae(oe(r),"openFormToAdd",function(){return r.dialogEdit.current.handleOpenForm({schema:r.props.schema,titleDialog:"Add",modelValues:{}})}),ae(oe(r),"showConfirmDelete",function(e){return r.setState({openConfirmDelete:!0,idDelete:e._id})}),ae(oe(r),"handleCancel",function(){return r.setState({openConfirmDelete:!1,idDelete:null})}),ae(oe(r),"handleSubmit",function(t){var n=r.props,o=n.onSuccess,i=n.onError;(void 0!==e.TXMopenLoader&&TXMopenLoader(),t._id)?r.props.updateMethod(t).then(function(){r.dialogEdit.current.handleCloseForm(),void 0!==e.Alert&&Alert.success("Successfully edited !"),o&&o({type:"update",document:t})}).catch(function(t){void 0!==e.Alert&&Alert.error("Somethings went wrong : "+t),i&&i(t)}).finally(function(){void 0!==e.TXMcloseLoader&&TXMcloseLoader()}):r.props.insertMethod(t).then(function(){r.dialogEdit.current.handleCloseForm(),void 0!==e.Alert&&Alert.success("Successfully added !"),o&&o({type:"create",document:t})}).catch(function(t){void 0!==e.Alert&&Alert.error("Somethings went wrong : "+t),i&&i(t)}).finally(function(){void 0!==e.TXMcloseLoader&&TXMcloseLoader()})}),ae(oe(r),"handleConfirm",function(){var t=r.props,n=t.onSuccess,o=t.onError,i=r.props.deleteMethod(r.state.idDelete);r.setState({openConfirmDelete:!1,idDelete:null}),void 0!==e.TXMopenLoader&&TXMopenLoader(),i.then(function(){void 0!==e.Alert&&Alert.success("Successfully deleted !"),n&&n({type:"delete",document:values})}).catch(function(t){void 0!==e.Alert&&Alert.error("Somethings went wrong : "+t),o&&o(t)}).finally(function(){void 0!==e.TXMcloseLoader&&TXMcloseLoader()})}),ae(oe(r),"handleUpdate",function(e){var t=r.props.schemaEdit||r.props.schema,n=Object.keys(e).filter(function(e){return t._schemaKeys.includes(e)}),o={};n.forEach(function(t){o[t]=e[t]}),r.dialogEdit.current.handleOpenForm({schema:t,titleDialog:"Edit",modelValues:o})}),r}var r,i,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ie(e,t)}(n,o.a.Component),r=n,(i=[{key:"render",value:function(){var e=this,t=this.props,n=t.canAdd,r=void 0!==n&&n,i=t.canDelete,a=void 0!==i&&i,c=t.canEdit,l=void 0!==c&&c,f=t.style,d=void 0===f?{}:f,h=t.className,b=void 0===h?"":h,g=t.options,S=void 0===g?{}:g,x=t.entries,E=t.columns,P=t.moreActions,q=void 0===P?[]:P,j=[];r&&j.push({icon:w.a,iconProps:{color:"primary"},tooltip:"Add",isFreeAction:!0,onClick:this.openFormToAdd}),l&&!S.selection&&j.push({icon:O.a,iconProps:{color:"action"},tooltip:"Edit",onClick:function(t,n){e.handleUpdate(n)}}),a&&j.push({icon:C.a,tooltip:"Delete",iconProps:{color:"error"},onClick:function(t,n){e.showConfirmDelete(n)}}),q.length>0&&q.forEach(function(e){return j.push(e)});var A=o.a.createElement(s.a,{open:this.state.openConfirmDelete,onClose:this.handleCancel},o.a.createElement(p.a,null,"Confirmation"),o.a.createElement(m.a,null,"Are you sure ?"),o.a.createElement(y.a,null,o.a.createElement(v.a,{onClick:this.handleCancel},"Cancel"),o.a.createElement(v.a,{color:"primary",onClick:this.handleConfirm},"Confirm")));return o.a.createElement("div",{style:d,className:b},o.a.createElement($.a,{ref:this.dialogEdit,title:this.props.title,onSubmit:this.handleSubmit}),o.a.createElement("br",null),o.a.createElement(u.a,{icons:ce,columns:E.map(function(e){return te({},e,{title:e.name,field:e.property})}),data:x,options:te({columnsButton:!0,pageSize:25,pageSizeOptions:[25,50,100],emptyRowsWhenPaging:!1,filtering:!0,actionsColumnIndex:-1,debounceInterval:500},S),title:"List of ".concat(this.props.title),actions:j}),A)}}])&&ne(r.prototype,i),a&&ne(r,a),n}();ue.defaultProps={loading:!1,moreActions:[]},ue.propTypes={loading:a.a.bool,entries:a.a.array.isRequired,columns:a.a.array.isRequired,title:a.a.string.isRequired,schema:a.a.object,updateMethod:a.a.func.isRequired,deleteMethod:a.a.func.isRequired,insertMethod:a.a.func.isRequired,canAdd:a.a.bool,canDelete:a.a.bool,canEdit:a.a.bool,moreActions:a.a.arrayOf(a.a.shape({button:a.a.element.isRequired,onClick:a.a.func.isRequired}))}}).call(this,n(33))},function(e,t){e.exports=require("material-table")},function(e,t){e.exports=require("@material-ui/core/Dialog")},function(e,t){e.exports=require("@material-ui/core/DialogTitle")},function(e,t){e.exports=require("@material-ui/core/DialogContent")},function(e,t){e.exports=require("@material-ui/core/DialogActions")},function(e,t){e.exports=require("@material-ui/icons/Delete")},function(e,t){e.exports=require("@material-ui/icons/AddCircle")},function(e,t){e.exports=require("@material-ui/icons/AddBox")},function(e,t){e.exports=require("@material-ui/icons/ArrowUpward")},function(e,t){e.exports=require("@material-ui/icons/Check")},function(e,t){e.exports=require("@material-ui/icons/ChevronLeft")},function(e,t){e.exports=require("@material-ui/icons/DeleteOutline")},function(e,t){e.exports=require("@material-ui/icons/FilterList")},function(e,t){e.exports=require("@material-ui/icons/FirstPage")},function(e,t){e.exports=require("@material-ui/icons/LastPage")},function(e,t){e.exports=require("@material-ui/icons/Remove")},function(e,t){e.exports=require("@material-ui/icons/SaveAlt")},function(e,t){e.exports=require("@material-ui/icons/Search")},function(e,t){e.exports=require("@material-ui/icons/ViewColumn")},function(e,t,n){"use strict";var r=n(0),o=n.n(r),i=n(27),a=n(28),c=n.n(a),u=n(29),l=n.n(u),s=n(30),f=n.n(s),p=n(31),d=n.n(p),m=n(2),h=n.n(m);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=function(e){function t(){var e,n,r,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];return r=this,i=(e=v(t)).call.apply(e,[this].concat(c)),n=!i||"object"!==y(i)&&"function"!=typeof i?g(r):i,S(g(n),"formRef",o.a.createRef()),S(g(n),"state",{open:!1,titleDialog:"Add",modelValues:{},schema:null}),S(g(n),"handleCloseForm",function(){n.setState({open:!1})}),S(g(n),"handleOpenForm",function(e){n.setState(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){S(e,t,n[t])})}return e}({open:!0},e))}),S(g(n),"handleSubmit",function(){n.formRef.current.submit()}),n}var n,a,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this.props,t=e.fullScreenDialog,n=void 0!==t&&t,r=e.title,a=e.onSubmit,u=this.state,s=u.open,p=u.titleDialog,m=u.modelValues,y=u.schema;return y?o.a.createElement(c.a,{fullScreen:n,open:s,onClose:this.handleCloseForm},o.a.createElement(l.a,null,"".concat(p," ").concat(r)),o.a.createElement(f.a,null,o.a.createElement(i.AutoForm,{grid:3,ref:this.formRef,schema:y,model:m,submitField:function(){return null},onSubmit:a,placeholder:!0,name:r,id:"addList"})),o.a.createElement(d.a,null,o.a.createElement(h.a,{onClick:this.handleCloseForm},"Cancel"),",",o.a.createElement(h.a,{color:"primary",onClick:this.handleSubmit},"Submit"))):null}}])&&b(n.prototype,a),u&&b(n,u),t}();t.a=C},function(e,t){e.exports=require("uniforms-material")},function(e,t){e.exports=require("@material-ui/core/Dialog/index")},function(e,t){e.exports=require("@material-ui/core/DialogTitle/index")},function(e,t){e.exports=require("@material-ui/core/DialogContent/index")},function(e,t){e.exports=require("@material-ui/core/DialogActions/index")},function(e,t,n){"use strict";n.r(t);var r=n(6);t.default=r.a},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var r=n(35);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}]);