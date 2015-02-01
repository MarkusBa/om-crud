// Compiled by ClojureScript 0.0-2173
goog.provide('om_crud.core');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('cljs.reader');
goog.require('goog.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('goog.net.XhrIo');
goog.require('goog.dom');
goog.require('om.core');
goog.require('om.dom');
goog.require('cljs.reader');
goog.require('goog.events.EventType');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
om_crud.core.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
om_crud.core.edn_xhr = (function edn_xhr(p__22915){var map__22917 = p__22915;var map__22917__$1 = ((cljs.core.seq_QMARK_.call(null,map__22917))?cljs.core.apply.call(null,cljs.core.hash_map,map__22917):map__22917);var on_complete = cljs.core.get.call(null,map__22917__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__22917__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__22917__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__22917__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.reader.read_string.call(null,xhr.getResponseText()));
}));
return xhr.send(url,om_crud.core.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/edn"});
});
om_crud.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"persons","persons",4630430512),cljs.core.PersistentVector.EMPTY], null));
om_crud.core.display = (function display(show){if(cljs.core.truth_(show))
{return {};
} else
{return {"display": "none"};
}
});
om_crud.core.handle_change = (function handle_change(e,data,edit_key,owner){return om.core.transact_BANG_.call(null,data,edit_key,(function (_){return e.target.value;
}));
});
om_crud.core.end_edit = (function end_edit(text,owner,cb){om.core.set_state_BANG_.call(null,owner,new cljs.core.Keyword(null,"editing","editing",3420907786),false);
return cb.call(null,text);
});
om_crud.core.editable = (function editable(data,owner,p__22920){var map__22927 = p__22920;var map__22927__$1 = ((cljs.core.seq_QMARK_.call(null,map__22927))?cljs.core.apply.call(null,cljs.core.hash_map,map__22927):map__22927);var opts = map__22927__$1;var on_edit = cljs.core.get.call(null,map__22927__$1,new cljs.core.Keyword(null,"on-edit","on-edit",3936438442));var edit_key = cljs.core.get.call(null,map__22927__$1,new cljs.core.Keyword(null,"edit-key","edit-key",2614779790));if(typeof om_crud.core.t22928 !== 'undefined')
{} else
{
/**
* @constructor
*/
om_crud.core.t22928 = (function (edit_key,on_edit,opts,map__22927,p__22920,owner,data,editable,meta22929){
this.edit_key = edit_key;
this.on_edit = on_edit;
this.opts = opts;
this.map__22927 = map__22927;
this.p__22920 = p__22920;
this.owner = owner;
this.data = data;
this.editable = editable;
this.meta22929 = meta22929;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
om_crud.core.t22928.cljs$lang$type = true;
om_crud.core.t22928.cljs$lang$ctorStr = "om-crud.core/t22928";
om_crud.core.t22928.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"om-crud.core/t22928");
});
om_crud.core.t22928.prototype.om$core$IRenderState$ = true;
om_crud.core.t22928.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,p__22931){var self__ = this;
var map__22932 = p__22931;var map__22932__$1 = ((cljs.core.seq_QMARK_.call(null,map__22932))?cljs.core.apply.call(null,cljs.core.hash_map,map__22932):map__22932);var editing = cljs.core.get.call(null,map__22932__$1,new cljs.core.Keyword(null,"editing","editing",3420907786));var ___$1 = this;var text = cljs.core.get.call(null,self__.data,self__.edit_key);return React.DOM.li(null,React.DOM.span({"style": om_crud.core.display.call(null,cljs.core.not.call(null,editing))},text),om.dom.input.call(null,{"onBlur": (function (e){if(cljs.core.truth_(om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"editing","editing",3420907786))))
{return om_crud.core.end_edit.call(null,text,self__.owner,self__.on_edit);
} else
{return null;
}
}), "onKeyPress": (function (p1__22919_SHARP_){if((p1__22919_SHARP_.keyCode === 13))
{return om_crud.core.end_edit.call(null,text,self__.owner,self__.on_edit);
} else
{return null;
}
}), "onChange": (function (p1__22918_SHARP_){return om_crud.core.handle_change.call(null,p1__22918_SHARP_,self__.data,self__.edit_key,self__.owner);
}), "value": text, "style": om_crud.core.display.call(null,editing)}),React.DOM.button({"onClick": (function (){return om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"editing","editing",3420907786),true);
}), "style": om_crud.core.display.call(null,cljs.core.not.call(null,editing))},"Edit"));
});
om_crud.core.t22928.prototype.om$core$IInitState$ = true;
om_crud.core.t22928.prototype.om$core$IInitState$init_state$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",3420907786),false], null);
});
om_crud.core.t22928.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22930){var self__ = this;
var _22930__$1 = this;return self__.meta22929;
});
om_crud.core.t22928.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22930,meta22929__$1){var self__ = this;
var _22930__$1 = this;return (new om_crud.core.t22928(self__.edit_key,self__.on_edit,self__.opts,self__.map__22927,self__.p__22920,self__.owner,self__.data,self__.editable,meta22929__$1));
});
om_crud.core.__GT_t22928 = (function __GT_t22928(edit_key__$1,on_edit__$1,opts__$1,map__22927__$2,p__22920__$1,owner__$1,data__$1,editable__$1,meta22929){return (new om_crud.core.t22928(edit_key__$1,on_edit__$1,opts__$1,map__22927__$2,p__22920__$1,owner__$1,data__$1,editable__$1,meta22929));
});
}
return (new om_crud.core.t22928(edit_key,on_edit,opts,map__22927__$1,p__22920,owner,data,editable,null));
});
om_crud.core.on_edit = (function on_edit(uri,fullname){return om_crud.core.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617),new cljs.core.Keyword(null,"url","url",1014020321),[cljs.core.str("person/update")].join(''),new cljs.core.Keyword(null,"data","data",1016980252),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"uri","uri",1014020318),uri,new cljs.core.Keyword(null,"fullname","fullname",2345709836),fullname], null),new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (res){return cljs.core.println.call(null,"server response:",res);
})], null));
});
om_crud.core.persons_view = (function persons_view(app,owner){if(typeof om_crud.core.t22938 !== 'undefined')
{} else
{
/**
* @constructor
*/
om_crud.core.t22938 = (function (owner,app,persons_view,meta22939){
this.owner = owner;
this.app = app;
this.persons_view = persons_view;
this.meta22939 = meta22939;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
om_crud.core.t22938.cljs$lang$type = true;
om_crud.core.t22938.cljs$lang$ctorStr = "om-crud.core/t22938";
om_crud.core.t22938.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"om-crud.core/t22938");
});
om_crud.core.t22938.prototype.om$core$IRender$ = true;
om_crud.core.t22938.prototype.om$core$IRender$render$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"id": "persons"},React.DOM.h2(null,"Persons"),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,(function (person){var uri = new cljs.core.Keyword(null,"uri","uri",1014020318).cljs$core$IFn$_invoke$arity$1(person);return om.core.build.call(null,om_crud.core.editable,person,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",1017322386),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edit-key","edit-key",2614779790),new cljs.core.Keyword(null,"fullname","fullname",2345709836),new cljs.core.Keyword(null,"on-edit","on-edit",3936438442),(function (p1__22934_SHARP_){return om_crud.core.on_edit.call(null,uri,p1__22934_SHARP_);
})], null)], null));
}),new cljs.core.Keyword(null,"persons","persons",4630430512).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
om_crud.core.t22938.prototype.om$core$IWillMount$ = true;
om_crud.core.t22938.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return om_crud.core.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),"persons",new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (p1__22933_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"persons","persons",4630430512),(function (___$2){return p1__22933_SHARP_;
}));
})], null));
});
om_crud.core.t22938.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22940){var self__ = this;
var _22940__$1 = this;return self__.meta22939;
});
om_crud.core.t22938.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22940,meta22939__$1){var self__ = this;
var _22940__$1 = this;return (new om_crud.core.t22938(self__.owner,self__.app,self__.persons_view,meta22939__$1));
});
om_crud.core.__GT_t22938 = (function __GT_t22938(owner__$1,app__$1,persons_view__$1,meta22939){return (new om_crud.core.t22938(owner__$1,app__$1,persons_view__$1,meta22939));
});
}
return (new om_crud.core.t22938(owner,app,persons_view,null));
});
om.core.root.call(null,om_crud.core.persons_view,om_crud.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),goog.dom.getElement("persons")], null));

//# sourceMappingURL=core.js.map