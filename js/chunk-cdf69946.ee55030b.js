(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cdf69946"],{"19e9":function(t,e,a){"use strict";a("bde0")},2532:function(t,e,a){"use strict";var i=a("23e7"),r=a("5a34"),n=a("1d80"),s=a("ab13");i({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~String(n(this)).indexOf(r(t),arguments.length>1?arguments[1]:void 0)}})},"395e":function(t,e,a){},"498a":function(t,e,a){"use strict";var i=a("23e7"),r=a("58a8").trim,n=a("c8d2");i({target:"String",proto:!0,forced:n("trim")},{trim:function(){return r(this)}})},"511f":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"radio-button"},[a("input",{staticClass:"radio-button__checker",attrs:{type:t.inputType,name:t.groupName,id:t.id},domProps:{value:t.value,checked:t.getCheckState},on:{click:t.change}}),a("label",{staticClass:"radio-button__label",attrs:{for:t.id}},[t._v(" "+t._s(t.name)+" ")])])},r=[],n={name:"CheckInputItem",props:{name:String,id:String,isChecked:Boolean,comparingValue:[String,Array],groupName:String,value:Object,isLocked:{type:Boolean,default:!1},inputType:{default:"radio"}},methods:{change:function(){this.isLocked&&this.preventStop(event),this.$emit("change",this.value)},preventStop:function(t){return t.preventDefault(),!1}},computed:{getCheckState:function(){if(this.isChecked)return!0;if(this.comparingValue instanceof Array){for(var t=0;t<this.comparingValue.length;t++)if(this.comparingValue[t].text===this.value.text)return!0;return!1}return this.value.text===this.comparingValue}}},s=n,c=(a("d62f"),a("2877")),o=Object(c["a"])(s,i,r,!1,null,null,null);e["a"]=o.exports},"57ed":function(t,e,a){},"5a34":function(t,e,a){var i=a("44e7");t.exports=function(t){if(i(t))throw TypeError("The method doesn't accept regular expressions");return t}},"5aed":function(t,e,a){"use strict";a("395e")},"8bd3":function(t,e,a){t.exports=a.p+"img/unknown-car.4d0c085b.jpg"},"8ecf":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"admin-page"},[a("AdminSideBar",{staticClass:"admin-page__side-bar",attrs:{active:0}}),a("div",{staticClass:"admin-page__main-content"},[a("AdminHeader",{staticClass:"admin-page__header"}),a("div",{staticClass:"admin-page__content admin-content"},[a("p",{staticClass:"admin-content__title"},[t._v("Карточка автомобиля")]),a("div",{staticClass:"admin-content__items content-items"},[a("EntityFileInput",{staticClass:"input-file-item",attrs:{progress:t.getProgress,car:t.getLastCar}}),a("EntityDefaultInputs",{attrs:{title:"Настройки автомобиля","is-creatable":!0},on:{post:t.postNewCarHandled,new:t.cancelCarEditingHandled,cancel:t.leave,delete:t.deleteLastCarHandled}},[a("div",{staticClass:"edit-item"},[a("label",[t._v("Модель автомобиля")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.getLastCar.name,expression:"getLastCar.name"}],class:{"edit-item--error":!t.name},attrs:{type:"text",placeholder:"Hyndai, i30N"},domProps:{value:t.getLastCar.name},on:{input:function(e){e.target.composing||t.$set(t.getLastCar,"name",e.target.value)}}})]),a("div",{staticClass:"edit-item"},[a("label",[t._v("Номер")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.getLastCar.number,expression:"getLastCar.number"}],class:{"edit-item--error":!t.number},attrs:{type:"text",placeholder:"м123ав"},domProps:{value:t.getLastCar.number},on:{input:function(e){e.target.composing||t.$set(t.getLastCar,"number",e.target.value)}}})]),a("div",{staticClass:"edit-item"},[a("label",[t._v("Минимальная стоимость")]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.getLastCar.priceMin,expression:"getLastCar.priceMin",modifiers:{number:!0}}],class:{"edit-item--error":!t.priceMin},attrs:{type:"number",placeholder:"5 000"},domProps:{value:t.getLastCar.priceMin},on:{input:function(e){e.target.composing||t.$set(t.getLastCar,"priceMin",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"edit-item"},[a("label",[t._v("Максимальная стоимость")]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.getLastCar.priceMax,expression:"getLastCar.priceMax",modifiers:{number:!0}}],class:{"edit-item--error":!t.priceMax},attrs:{type:"number",placeholder:"10 000"},domProps:{value:t.getLastCar.priceMax},on:{input:function(e){e.target.composing||t.$set(t.getLastCar,"priceMax",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),a("ArrayField",{attrs:{"label-name":"Цвет",type:"text",placehoder:"Синий","modeling-value":{name:"colors",value:t.getLastCar.colors}}})],1)],1)]),a("AdminFooter",{staticClass:"admin-page__footer"})],1)],1)},r=[],n=(a("b0c0"),a("5530")),s=a("05d5"),c=a("a16e"),o=a("8e14"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"type-input-editor"},[void 0===t.car.thumbnail.path&&""===t.getCarImagePath?i("img",{ref:"carImage",staticClass:"car-item__image type-input-editor__image",attrs:{src:a("8bd3"),alt:"car-image"}}):i("img",{ref:"carImage",staticClass:"car-item__image type-input-editor__image",attrs:{alt:"car-image",src:t.imgSource,crossOrigin:"anonymous",referrerPolicy:"origin"}}),i("p",{staticClass:"type-input-editor__name"},[t._v(t._s(t.car.name))]),i("div",{staticClass:"type-input-editor__image-input"},[i("label",{attrs:{for:"car-image"}},[t._v(t._s(t.file?t.file.name:"Выберите файл..."))]),i("input",{ref:"imageInput",staticClass:"type-input-editor__input-file",attrs:{type:"file",id:"car-image",accept:"image/*"},on:{change:t.handleFileUpload}}),i("button",{on:{click:function(e){return t.$refs.imageInput.click()}}},[t._v("Обзор")])]),i("div",{staticClass:"type-input-editor__progress"},[i("div",{staticClass:"progress-status"},[i("p",[t._v("Заполнено:")]),i("p",[t._v(t._s(t.progress)+"%")])]),i("progress-bar",{attrs:{val:t.progress,max:t.total,"bar-border-radius":2}})],1),i("div",{staticClass:"type-input-editor__description"},[i("p",{staticClass:"type-input-editor__title"},[t._v("Описание")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.car.description,expression:"car.description"}],staticClass:"type-input-editor__text",attrs:{name:"description",placeholder:"Description..."},domProps:{value:t.car.description},on:{input:function(e){e.target.composing||t.$set(t.car,"description",e.target.value)}}})])])},u=[],d=(a("a9e3"),a("2f62")),p={name:"EntityFileInput",props:{progress:{type:Number,default:0},total:{type:Number,default:100},car:Object},data:function(){return{file:null}},methods:Object(n["a"])(Object(n["a"])({},Object(d["d"])(["updateCarFile","updateCarImagePath"])),{},{handleFileUpload:function(t){this.file=t.target.files[0],console.log(this.file);var e=new FileReader;e.addEventListener("load",function(){this.$refs.carImage.src=e.result,this.updateCarImagePath(e.result)}.bind(this),!1),this.file&&/\.(jpe?g|png|gif)$/i.test(this.file.name)&&(e.readAsDataURL(this.file),this.updateCarImagePath(""),this.updateCarFile(this.file))}}),computed:Object(n["a"])(Object(n["a"])({},Object(d["c"])(["getLastCar","getCarImagePath","getCar "])),{},{imgSource:function(){return""!==this.getCarImagePath?this.getCarImagePath:"https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/"+this.car.thumbnail.path}})},m=p,g=(a("19e9"),a("2877")),h=Object(g["a"])(m,l,u,!1,null,null,null),f=h.exports,v=a("ade8"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper"},[a("div",{staticClass:"edit-item"},[a("label",{attrs:{for:"car-color"}},[t._v("Доступные цвета")]),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.currentItem,expression:"currentItem"}],attrs:{type:"text",id:"car-color",placeholder:"Синий"},domProps:{value:t.currentItem},on:{input:function(e){e.target.composing||(t.currentItem=e.target.value)}}}),a("button",{on:{click:t.addItem}},[t._v("+")])])]),a("div",{staticClass:"main-edit-items__colors"},t._l(t.modelingValue.value,(function(t){return a("CheckInputItem",{key:t,attrs:{"input-type":"checkbox",value:{text:t,amount:0},name:t,"is-checked":!0,"is-locked":!0}})})),1)])},b=[],_=(a("caad"),a("d81d"),a("2532"),a("498a"),a("511f")),y={name:"ArrayField",components:{CheckInputItem:_["a"]},props:{labelName:String,type:String,placehoder:String,modelingValue:Object},data:function(){return{currentItem:""}},methods:{addItem:function(){"string"!==typeof this.currentItem||0===this.currentItem.trim().length||this.modelingValue.value.map((function(t){return t.toLowerCase()})).includes(this.currentItem.trim())||(this.modelingValue.value.push(this.currentItem.trim()),this.currentItem="")}}},x=y,L=(a("5aed"),Object(g["a"])(x,C,b,!1,null,"b9cc877a",null)),I=L.exports,M=a("a18c"),k={name:"AdminEntityEdit",components:{AdminSideBar:s["a"],AdminHeader:c["a"],AdminFooter:o["a"],EntityFileInput:f,EntityDefaultInputs:v["a"],ArrayField:I},data:function(){return{name:!0,priceMin:!0,priceMax:!0,number:!0}},methods:Object(n["a"])(Object(n["a"])({},Object(d["b"])(["postNewCar","cancelCarEditing","deleteLastCar","updateCar"])),{},{postNewCarHandled:function(){this.validate(),this.isValidMinPrice&&this.isValidPriceMax&&this.isValidName&&this.isValidNumber&&(this.getEditingStatus?this.updateCar():this.postNewCar(),M["a"].push("/admin/cars"))},deleteLastCarHandled:function(){void 0!==this.getLastCar.id&&this.deleteLastCar(this.getLastCar.id)},cancelCarEditingHandled:function(){this.cancelCarEditing(),this.removeValidation()},leave:function(){this.cancelCarEditing(),this.removeValidation(),M["a"].push("/admin/cars")},validate:function(){this.name=this.isValidName,this.number=this.isValidNumber,this.priceMax=this.isValidPriceMax,this.priceMin=this.isValidMinPrice},removeValidation:function(){this.name=!0,this.number=!0,this.priceMin=!0,this.priceMax=!0}}),computed:Object(n["a"])(Object(n["a"])({},Object(d["c"])(["getEditingStatus","getLastCar","getProgress"])),{},{isValidName:function(){return 0!==this.getLastCar.name.length},isValidNumber:function(){return/[a-z][0-9][0-9][0-9][a-z][a-z]/.test(this.getLastCar.number)},isValidMinPrice:function(){return this.getLastCar.priceMin>0&&this.getLastCar.priceMin<this.getLastCar.priceMax},isValidPriceMax:function(){return this.getLastCar.priceMax>0&&this.getLastCar.priceMin<this.getLastCar.priceMax}})},V=k,w=(a("eb4b"),Object(g["a"])(V,i,r,!1,null,"516b907e",null));e["default"]=w.exports},9985:function(t,e,a){},ab13:function(t,e,a){var i=a("b622"),r=i("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[r]=!1,"/./"[t](e)}catch(i){}}return!1}},bde0:function(t,e,a){},c8d2:function(t,e,a){var i=a("d039"),r=a("5899"),n="​᠎";t.exports=function(t){return i((function(){return!!r[t]()||n[t]()!=n||r[t].name!==t}))}},caad:function(t,e,a){"use strict";var i=a("23e7"),r=a("4d64").includes,n=a("44d2"),s=a("ae40"),c=s("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!c},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")},d62f:function(t,e,a){"use strict";a("9985")},eb4b:function(t,e,a){"use strict";a("57ed")}}]);
//# sourceMappingURL=chunk-cdf69946.ee55030b.js.map