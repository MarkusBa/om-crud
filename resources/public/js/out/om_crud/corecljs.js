// Compiled by ClojureScript 0.0-2173
goog.provide('om_crud.corecljs');
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
om_crud.corecljs.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
om_crud.corecljs.edn_xhr = (function edn_xhr(p__5733){var map__5735 = p__5733;var map__5735__$1 = ((cljs.core.seq_QMARK_.call(null,map__5735))?cljs.core.apply.call(null,cljs.core.hash_map,map__5735):map__5735);var on_complete = cljs.core.get.call(null,map__5735__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__5735__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__5735__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__5735__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.reader.read_string.call(null,xhr.getResponseText()));
}));
return xhr.send(url,om_crud.corecljs.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/edn"});
});
om_crud.corecljs.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"persons","persons",4630430512),cljs.core.PersistentVector.EMPTY], null));
om_crud.corecljs.display = (function display(show){if(cljs.core.truth_(show))
{return {};
} else
{return {"display": "none"};
}
});
om_crud.corecljs.handle_change = (function handle_change(e,data,edit_key,owner){return om.core.transact_BANG_.call(null,data,edit_key,(function (_){return e.target.value;
}));
});
om_crud.corecljs.end_edit = (function end_edit(text,owner,cb){om.core.set_state_BANG_.call(null,owner,new cljs.core.Keyword(null,"editing","editing",3420907786),false);
return cb.call(null,text);
});
om_crud.corecljs.editable = (function editable(data,owner,p__5738){var map__5745 = p__5738;var map__5745__$1 = ((cljs.core.seq_QMARK_.call(null,map__5745))?cljs.core.apply.call(null,cljs.core.hash_map,map__5745):map__5745);var opts = map__5745__$1;var on_edit = cljs.core.get.call(null,map__5745__$1,new cljs.core.Keyword(null,"on-edit","on-edit",3936438442));var edit_key = cljs.core.get.call(null,map__5745__$1,new cljs.core.Keyword(null,"edit-key","edit-key",2614779790));if(typeof om_crud.corecljs.t5746 !== 'undefined')
{} else
{
/**
* @constructor
*/
om_crud.corecljs.t5746 = (function (edit_key,on_edit,opts,map__5745,p__5738,owner,data,editable,meta5747){
this.edit_key = edit_key;
this.on_edit = on_edit;
this.opts = opts;
this.map__5745 = map__5745;
this.p__5738 = p__5738;
this.owner = owner;
this.data = data;
this.editable = editable;
this.meta5747 = meta5747;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
om_crud.corecljs.t5746.cljs$lang$type = true;
om_crud.corecljs.t5746.cljs$lang$ctorStr = "om-crud.corecljs/t5746";
om_crud.corecljs.t5746.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"om-crud.corecljs/t5746");
});
om_crud.corecljs.t5746.prototype.om$core$IRenderState$ = true;
om_crud.corecljs.t5746.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,p__5749){var self__ = this;
var map__5750 = p__5749;var map__5750__$1 = ((cljs.core.seq_QMARK_.call(null,map__5750))?cljs.core.apply.call(null,cljs.core.hash_map,map__5750):map__5750);var editing = cljs.core.get.call(null,map__5750__$1,new cljs.core.Keyword(null,"editing","editing",3420907786));var ___$1 = this;var text = cljs.core.get.call(null,self__.data,self__.edit_key);return React.DOM.li(null,React.DOM.span({"style": om_crud.corecljs.display.call(null,cljs.core.not.call(null,editing))},text),om.dom.input.call(null,{"onBlur": (function (e){if(cljs.core.truth_(om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"editing","editing",3420907786))))
{return om_crud.corecljs.end_edit.call(null,text,self__.owner,self__.on_edit);
} else
{return null;
}
}), "onKeyPress": (function (p1__5737_SHARP_){if((p1__5737_SHARP_.keyCode === 13))
{return om_crud.corecljs.end_edit.call(null,text,self__.owner,self__.on_edit);
} else
{return null;
}
}), "onChange": (function (p1__5736_SHARP_){return om_crud.corecljs.handle_change.call(null,p1__5736_SHARP_,self__.data,self__.edit_key,self__.owner);
}), "value": text, "style": om_crud.corecljs.display.call(null,editing)}),React.DOM.button({"onClick": (function (){return om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"editing","editing",3420907786),true);
}), "style": om_crud.corecljs.display.call(null,cljs.core.not.call(null,editing))},"Edit"));
});
om_crud.corecljs.t5746.prototype.om$core$IInitState$ = true;
om_crud.corecljs.t5746.prototype.om$core$IInitState$init_state$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing","editing",3420907786),false], null);
});
om_crud.corecljs.t5746.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_5748){var self__ = this;
var _5748__$1 = this;return self__.meta5747;
});
om_crud.corecljs.t5746.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_5748,meta5747__$1){var self__ = this;
var _5748__$1 = this;return (new om_crud.corecljs.t5746(self__.edit_key,self__.on_edit,self__.opts,self__.map__5745,self__.p__5738,self__.owner,self__.data,self__.editable,meta5747__$1));
});
om_crud.corecljs.__GT_t5746 = (function __GT_t5746(edit_key__$1,on_edit__$1,opts__$1,map__5745__$2,p__5738__$1,owner__$1,data__$1,editable__$1,meta5747){return (new om_crud.corecljs.t5746(edit_key__$1,on_edit__$1,opts__$1,map__5745__$2,p__5738__$1,owner__$1,data__$1,editable__$1,meta5747));
});
}
return (new om_crud.corecljs.t5746(edit_key,on_edit,opts,map__5745__$1,p__5738,owner,data,editable,null));
});
om_crud.corecljs.on_edit = (function on_edit(uri,fullname){return om_crud.corecljs.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617),new cljs.core.Keyword(null,"url","url",1014020321),[cljs.core.str("person/"),cljs.core.str(uri),cljs.core.str("/update")].join(''),new cljs.core.Keyword(null,"data","data",1016980252),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fullname","fullname",2345709836),fullname], null),new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (res){return cljs.core.println.call(null,"server response:",res);
})], null));
});
om_crud.corecljs.persons_view = (function persons_view(app,owner){if(typeof om_crud.corecljs.t5756 !== 'undefined')
{} else
{
/**
* @constructor
*/
om_crud.corecljs.t5756 = (function (owner,app,persons_view,meta5757){
this.owner = owner;
this.app = app;
this.persons_view = persons_view;
this.meta5757 = meta5757;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
om_crud.corecljs.t5756.cljs$lang$type = true;
om_crud.corecljs.t5756.cljs$lang$ctorStr = "om-crud.corecljs/t5756";
om_crud.corecljs.t5756.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"om-crud.corecljs/t5756");
});
om_crud.corecljs.t5756.prototype.om$core$IRender$ = true;
om_crud.corecljs.t5756.prototype.om$core$IRender$render$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"id": "persons"},React.DOM.h2(null,"Persons"),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,(function (person){var uri = new cljs.core.Keyword(null,"uri","uri",1014020318).cljs$core$IFn$_invoke$arity$1(person);return om.core.build.call(null,om_crud.corecljs.editable,person,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",1017322386),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edit-key","edit-key",2614779790),new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"on-edit","on-edit",3936438442),(function (p1__5752_SHARP_){return om_crud.corecljs.on_edit.call(null,uri,p1__5752_SHARP_);
})], null)], null));
}),new cljs.core.Keyword(null,"persons","persons",4630430512).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
om_crud.corecljs.t5756.prototype.om$core$IWillMount$ = true;
om_crud.corecljs.t5756.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return om_crud.corecljs.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),"persons",new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (p1__5751_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"persons","persons",4630430512),(function (___$2){return p1__5751_SHARP_;
}));
})], null));
});
om_crud.corecljs.t5756.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_5758){var self__ = this;
var _5758__$1 = this;return self__.meta5757;
});
om_crud.corecljs.t5756.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_5758,meta5757__$1){var self__ = this;
var _5758__$1 = this;return (new om_crud.corecljs.t5756(self__.owner,self__.app,self__.persons_view,meta5757__$1));
});
om_crud.corecljs.__GT_t5756 = (function __GT_t5756(owner__$1,app__$1,persons_view__$1,meta5757){return (new om_crud.corecljs.t5756(owner__$1,app__$1,persons_view__$1,meta5757));
});
}
return (new om_crud.corecljs.t5756(owner,app,persons_view,null));
});
om.core.root.call(null,om_crud.corecljs.persons_view,om_crud.corecljs.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),goog.dom.getElement("persons")], null));

//# sourceMappingURL=corecljs.js.map