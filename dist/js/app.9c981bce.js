(function(e){function t(t){for(var o,r,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&d.push(a[r][0]),a[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);p&&p(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var s=n[r];0!==a[s]&&(o=!1)}o&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={app:0},a={app:0},i=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-15d29f99":"461fa5b7","chunk-6339bbca":"825bdc33","chunk-75c065cc":"2a15c408","chunk-2d213afc":"91e287ea","chunk-2d21b46e":"8f93dcc5","chunk-92e5437e":"781dfa6d","chunk-95f9fe9a":"3f7a1c71"}[e]+".js"}function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-15d29f99":1,"chunk-6339bbca":1,"chunk-75c065cc":1,"chunk-92e5437e":1,"chunk-95f9fe9a":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-15d29f99":"e373bde7","chunk-6339bbca":"b14678a7","chunk-75c065cc":"cd45f7e9","chunk-2d213afc":"31d6cfe0","chunk-2d21b46e":"31d6cfe0","chunk-92e5437e":"f7696594","chunk-95f9fe9a":"f7696594"}[e]+".css",a=c.p+o,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===o||l===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[e],p.parentNode.removeChild(p),n(i)},p.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(p)})).then((function(){r[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",d.name="ChunkLoadError",d.type=o,d.request=r,n[1](d)}a[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("b0c0"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var o,r,a,i=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-navigation-drawer",{attrs:{app:""},model:{value:e.mainMenu,callback:function(t){e.mainMenu=t},expression:"mainMenu"}},[e.$store.state.account.isLoggedIn?n("v-list",[n("v-list-item-group",{attrs:{mandatory:""},model:{value:e.mainMenuModel,callback:function(t){e.mainMenuModel=t},expression:"mainMenuModel"}},e._l(e.getRoutes,(function(t){return n("v-list-item",{key:t.name,nativeOn:{click:function(n){return e.$router.push(t.path)}}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.name)}})],1)],1)})),1)],1):e._e()],1),n("v-app-bar",{attrs:{app:"",color:"primary",src:"/assets/1920_bar.png"}},[n("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.mainMenu=!e.mainMenu}}}),n("v-toolbar-title",{staticClass:"mr-4"},[e._v(" "+e._s(e.$store.state.metaverseConfig.nickname)+" ")]),e.$store.state.account.isLoggedIn?n("span",{staticClass:"mr-4"},[e._v(" Hello, "+e._s(e.$store.state.account.username)+"! ")]):e._e(),this.$store.state.account.isAdmin?n("span",{staticClass:"mt-5"},[n("v-switch",{attrs:{inset:"",row:"",label:"Admin View"},model:{value:e.useAsAdminStore,callback:function(t){e.useAsAdminStore=t},expression:"useAsAdminStore"}})],1):e._e(),n("v-spacer"),n("v-tooltip",{attrs:{left:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,r=t.attrs;return[n("v-btn",e._g(e._b({directives:[{name:"show",rawName:"v-show",value:e.isLoggedIn,expression:"isLoggedIn"}],attrs:{icon:""},on:{click:e.logout}},"v-btn",r,!1),o),[n("v-icon",[e._v("mdi-export")])],1)]}}])},[n("span",[e._v("Logout")])])],1),n("transition",{attrs:{name:"fade",mode:"out-in"}},[e.dialog.show?n(e.dialog.which,{tag:"component",on:{hideDialog:function(t){e.dialog.show=!1}}}):e._e()],1),n("transition",{attrs:{name:"fade",mode:"out-in","hide-on-leave":"true"}},[n("router-view")],1),n("v-footer",{attrs:{color:"primary",app:""}},[n("span",{staticClass:"white--text"},[e._v("Iamus Dashboard v0.0.1e | Vircadia | "),n("a",{staticClass:"white--text",attrs:{href:"https://github.com/vircadia/project-iamus-dashboard/issues"}},[e._v("Feedback")])]),n("v-spacer"),n("span",{staticClass:"white--text"},[e._v("Metaverse: "),n("b",[e._v(e._s(e.$store.state.metaverseConfig.server))])]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.metaverseConfig.serverVersion,expression:"$store.state.metaverseConfig.serverVersion"}],staticClass:"white--text ml-4"},[e._v("Version: "+e._s(e.$store.state.metaverseConfig.serverVersion["npm-package-version"]))])],1)],1)},c=[],u=(n("4de4"),n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("8552")),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{width:"500",persistent:""},model:{value:e.showDialogInternal,callback:function(t){e.showDialogInternal=t},expression:"showDialogInternal"}},[n("v-card",[n("v-card-title",{staticClass:"headline",attrs:{"primary-title":"",dark:""}},[n("v-icon",{staticClass:"mr-2",attrs:{color:"red"}},[e._v("mdi-comment-question")]),e._v(" "+e._s(this.error.title)+" ")],1),n("v-card-text",[e._v(" Error code "),n("code",[e._v(e._s(this.error.code))]),e._v(" "),n("br"),e._v(" The full error is shown below: "),n("br"),n("code",[e._v(e._s(this.error.full))])]),n("v-divider"),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"red"},on:{click:function(t){return e.$emit("hideDialog")}}},[e._v(" Close ")])],1)],1)],1)},d=[],p={name:"ErrorOccurred",methods:{},data:function(){return{showDialogInternal:!0,error:{title:"",code:"",full:""}}},created:function(){this.error.title=this.$store.state.error.title,this.error.code=this.$store.state.error.code,this.error.full=this.$store.state.error.full,console.info("this.error",this.error),console.info("this.$store.state.error",this.$store.state.error)}},h=p,f=n("2877"),m=n("6544"),g=n.n(m),v=n("8336"),w=n("b0af"),k=n("99d9"),b=n("169a"),_=n("ce7e"),y=n("132d"),I=n("2fa4"),A=Object(f["a"])(h,l,d,!1,null,null,null),S=A.exports;g()(A,{VBtn:v["a"],VCard:w["a"],VCardActions:k["a"],VCardText:k["b"],VCardTitle:k["c"],VDialog:b["a"],VDivider:_["a"],VIcon:y["a"],VSpacer:I["a"]}),u["a"].$on("open-dialog",(function(e){o.openDialog(e.which,e.shouldShow)}));var T={name:"App",components:{ErrorOccurred:S},computed:{updateAccountSession:function(){return this.$store.state.account},updateAccessToken:function(){return this.$store.state.account.accessToken},metaverseServerChanged:function(){return this.$store.state.metaverseConfig.server},getRoutes:function(){var e=this.$router.options.routes;return e=this.$store.state.account.isLoggedIn?this.$router.options.routes.filter((function(e){return"Login"!==e.name})):this.$router.options.routes.filter((function(e){return"Login"===e.name})),e},useAsAdminStore:{get:function(){return this.$store.state.account.useAsAdmin},set:function(e){this.$store.commit("mutate",{update:!0,property:"account",with:{useAsAdmin:e}})}},isLoggedIn:function(){return this.$store.state.account.isLoggedIn}},watch:{updateAccountSession:{handler:function(e){for(var t in e)null!==e[t]&&localStorage.setItem(t,e[t])},deep:!0},updateAccessToken:{handler:function(){console.info("Setting new access token header..."),window.$.ajaxSetup({beforeSend:function(e){e.setRequestHeader("x-vircadia-error-handle","badrequest"),e.setRequestHeader("Authorization","Bearer "+o.$store.state.account.accessToken)}})}},useAsAdminStore:{handler:function(){location.reload()}},metaverseServerChanged:{handler:function(e){e!==r.account.metaverseServer&&this.logout()}},isLoggedIn:{handler:function(){this.awaitingRouteOnLogin&&this.$router.push(this.routeOnLogin)}}},methods:{openDialog:function(e,t){this.dialog.which="",this.dialog.show=!1,this.dialog.which=e,this.dialog.show=t},closeDialog:function(){this.dialog.which="",this.dialog.show=!1},retrieveMetaverseConfig:function(e){window.$.ajax({type:"GET",url:e+"/api/metaverse_info"}).done((function(e){o.$store.commit("mutate",{property:"metaverseConfig",with:{name:e.metaverse_name,nickname:e.metaverse_nick_name,server:e.metaverse_url,iceServer:e.ice_server_url,serverVersion:e.metaverse_server_version}})})).fail((function(t){console.info("Failed: ",t),o.$store.commit("mutate",{property:"error",with:{title:"Failed to Retrieve Metaverse Information",code:"1",full:"We were unable to retrieve the metaverse information for "+e}}),o.openDialog("ErrorOccurred",!0)}))},logout:function(){o.$store.commit("mutate",{update:!0,property:"account",with:{isLoggedIn:!1,isAdmin:!1,accessToken:null,refreshToken:null}}),this.$router.push("Login")}},created:function(){o=this,r=this.$store.state,a=r.metaverseConfig.server;var e=new URLSearchParams(window.location.search);e.has("metaverse")?this.retrieveMetaverseConfig(e.get("metaverse")):this.retrieveMetaverseConfig(a),e.has("page")&&(this.isLoggedIn?this.$router.push(e.get("page")):(this.awaitingRouteOnLogin=!0,this.routeOnLogin=e.get("page")))},data:function(){return{mainMenu:null,mainMenuModel:null,dialog:{show:!1,which:""},awaitingRouteOnLogin:!1,routeOnLogin:""}}},C=T,L=n("7496"),$=n("40dc"),V=n("5bc1"),x=n("553a"),O=n("8860"),E=n("da13"),M=n("5d23"),P=n("1baa"),j=n("34c3"),F=n("f774"),D=n("b73d"),R=n("2a7f"),B=n("3a2f"),N=Object(f["a"])(C,s,c,!1,null,null,null),q=N.exports;g()(N,{VApp:L["a"],VAppBar:$["a"],VAppBarNavIcon:V["a"],VBtn:v["a"],VFooter:x["a"],VIcon:y["a"],VList:O["a"],VListItem:E["a"],VListItemContent:M["a"],VListItemGroup:P["a"],VListItemIcon:j["a"],VListItemTitle:M["c"],VNavigationDrawer:F["a"],VSpacer:I["a"],VSwitch:D["a"],VToolbarTitle:R["a"],VTooltip:B["a"]});var H=n("8c4f"),z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[n("v-main",[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{staticClass:"text-center"},[n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[n("v-btn",e._g({attrs:{href:e.source,icon:"",large:"",target:"_blank"}},o),[n("v-icon",{attrs:{large:""}},[e._v("mdi-heart")])],1)]}}])},[n("span",[n("v-avatar",{staticClass:"mr-2",attrs:{color:"pink",size:"72"}},[n("v-img",{attrs:{src:"/assets/231352681.png"}})],1),e._v(" I hope you are having a wonderful day, "+e._s(e.$store.state.account.username)+"! ")],1)])],1)],1)],1)],1)],1)},U=[],J={name:"Home",props:{source:String}},G=J,Y=n("8212"),K=n("62ad"),Q=n("a523"),W=n("adda"),X=n("f6c4"),Z=n("0fd9"),ee=Object(f["a"])(G,z,U,!1,null,null,null),te=ee.exports;g()(ee,{VApp:L["a"],VAvatar:Y["a"],VBtn:v["a"],VCol:K["a"],VContainer:Q["a"],VIcon:y["a"],VImg:W["a"],VMain:X["a"],VRow:Z["a"],VTooltip:B["a"]}),i["a"].use(H["a"]);var ne=[{path:"/login",name:"Login",icon:"mdi-login",component:function(){return Promise.all([n.e("chunk-15d29f99"),n.e("chunk-6339bbca")]).then(n.bind(null,"a55b"))}},{path:"/",name:"Home",icon:"mdi-home",component:te},{path:"/people",name:"People",icon:"mdi-account-group",component:function(){return Promise.all([n.e("chunk-15d29f99"),n.e("chunk-75c065cc"),n.e("chunk-2d21b46e")]).then(n.bind(null,"bea6"))}},{path:"/places",name:"Places",icon:"mdi-map-marker-multiple-outline",component:function(){return Promise.all([n.e("chunk-15d29f99"),n.e("chunk-75c065cc"),n.e("chunk-92e5437e")]).then(n.bind(null,"d377"))}},{path:"/domain",name:"Domain",icon:"mdi-earth",component:function(){return Promise.all([n.e("chunk-15d29f99"),n.e("chunk-75c065cc"),n.e("chunk-2d213afc")]).then(n.bind(null,"ae79"))}},{path:"/profile",name:"Profile",icon:"mdi-account-circle",component:function(){return Promise.all([n.e("chunk-15d29f99"),n.e("chunk-95f9fe9a")]).then(n.bind(null,"c66d"))}}],oe=new H["a"]({mode:"history",base:"/",routes:ne}),re=oe,ae=n("2f62");i["a"].use(ae["a"]);var ie=new ae["a"].Store({state:{globalConsts:{SAFETY_BEFORE_SESSION_TIMEOUT:21600},initialized:!1,metaverseConfig:{name:"",nickname:"",server:"https://metaverse.vircadia.com/live",iceServer:"",serverVersion:""},error:{title:"",code:"",full:""},account:{isLoggedIn:!1,isAdmin:!1,useAsAdmin:!1,username:null,accountRoles:null,accountId:null,metaverseServer:null,accessToken:null,refreshToken:null,tokenType:null,createdAt:null,expiresIn:null,scope:null}},mutations:{mutate:function(e,t){if(t.update)for(var n in t.with)Object.prototype.hasOwnProperty.call(e[t.property],n)&&(e[t.property][n]=t.with[n]);else e[t.property]=t.with;console.info("Payload:",t.property,"with:",t.with,"state is now:",this.state)}},actions:{},modules:{}}),se=n("f309"),ce=n("fcf4");i["a"].use(se["a"]);var ue=new se["a"]({theme:{dark:!0,themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",input:ce["a"].purple},dark:{primary:ce["a"].purple.darken3,input:ce["a"].purple}}}});n("d5e8"),n("5363");function le(){window.$.ajaxSetup({beforeSend:function(e){e.setRequestHeader("x-vircadia-error-handle","badrequest"),e.setRequestHeader("Authorization","Bearer "+ie.state.account.accessToken)}})}function de(){var e=Math.floor((new Date).getTime()/1e3),t=parseInt(ie.state.account.createdAt)+parseInt(ie.state.account.expiresIn);return e>t||e-ie.state.globalConsts.SAFETY_BEFORE_SESSION_TIMEOUT>t}function pe(e){var t,n=localStorage.getItem(e);if(n&&"undefined"!==n)try{t=JSON.parse(n)}catch(o){console.info("Error retrieving",e,"from storage. Parsing error:",o)}else t=void 0;return t}function he(){var e={isLoggedIn:pe("isLoggedIn"),isAdmin:pe("isAdmin"),useAsAdmin:pe("useAsAdmin"),username:localStorage.getItem("username"),accountId:localStorage.getItem("accountId"),metaverseServer:localStorage.getItem("metaverseServer"),accessToken:localStorage.getItem("accessToken"),refreshToken:localStorage.getItem("refreshToken"),tokenType:localStorage.getItem("tokenType"),createdAt:pe("createdAt"),expiresIn:pe("expiresIn"),scope:localStorage.getItem("scope")};ie.commit("mutate",{property:"account",with:e}),ie.commit("mutate",{property:"initialized",with:!0})}window.$=window.jQuery=n("1157"),i["a"].config.productionTip=!1,i["a"].mixin({methods:{checkNeedsTokenRefresh:de,parseFromStorage:pe}}),re.beforeEach((function(e,t,n){console.info("Attempting to navigate to:",e.name),console.info("store.initialized",ie.state.initialized),!1===ie.state.initialized&&(he(),le()),console.info("Is the user logged in?",ie.state.account.isLoggedIn),"Login"===e.name||ie.state.account.isLoggedIn?"Login"===e.name&&!0===ie.state.account.isLoggedIn?(console.info("Attemping to access login before logging out, re-routing to home."),n({name:"Home"})):"Login"!==e.name||ie.state.account.isLoggedIn?(console.info("All other routing cases... Checking if a token refresh is needed."),de()?(console.info("Token refresh needed. Attempting to refresh token."),window.$.ajax({type:"POST",url:ie.state.metaverseConfig.server+"/oauth/token",contentType:"application/x-www-form-urlencoded;charset=UTF-8",data:{grant_type:"refresh_token",scope:ie.state.account.scope,refresh_token:ie.state.account.refreshToken}}).done((function(t){ie.commit("mutate",{update:!0,property:"account",with:{isLoggedIn:!0,accessToken:t.access_token,tokenType:t.token_type,createdAt:t.created_at,expiresIn:t.expires_in,refreshToken:t.refresh_token,scope:t.scope}}),console.info("Token refresh successful, routing to",e),n()})).fail((function(e){console.info("Refresh failed, re-routing to login."),ie.commit("mutate",{update:!0,property:"account",with:{isLoggedIn:!1}}),n({name:"Login"})}))):(console.info("Refresh not needed, attempting to continue route to",e),n())):(console.info("Attempting to access login while logged out, routing to login."),n()):(console.info("Attempting to access a page while logged out, routing to login."),n({name:"Login"}))})),new i["a"]({router:re,store:ie,vuetify:ue,render:function(e){return e(q)}}).$mount("#app")},8552:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n("2b0e"),r=new o["a"]}});
//# sourceMappingURL=app.9c981bce.js.map