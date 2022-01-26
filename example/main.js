import Vue from 'vue'
import JsonEditor from '../src/index.js'
import App from './App.vue'

Vue.use(JsonEditor);

export const Launcher = {
    /**
     * @param string selector
     * @param object options {updateComments: callback({key:key, comments:comments, target:ele})}
     */
    init: function(selector, options) {
        let ele = document.querySelectorAll(selector);
        let opt = options || {};

        if (!opt.comments) {
            opt.comments = {}
        }

        ele.forEach((item) => {
            new Vue({
                el: item,
                render: (h) => {
                    let name = item.getAttribute("name") || "";
                    let cols = item.getAttribute("cols") || "40";
                    let rows = item.getAttribute("rows") || "10";
                    let data_input_group = item.getAttribute("data_input_group") || "";
                    let data_has_siblings = item.getAttribute("data_has_siblings") || "";
                    let maxlength = item.getAttribute("maxlength") || "";
                    let cls = item.getAttribute("class") || "";
                    let id = item.getAttribute("id") || "";

                    return h(App, {
                        props: {
                            jsonData: JSON.parse(item.innerHTML) || {},
                            comments: opt.comments[name] || {},
                            name: name,
                            cols: cols,
                            rows: rows,
                            data_input_group: data_input_group,
                            data_has_siblings: data_has_siblings,
                            maxlength: maxlength,
                            cls: cls,
                            id: id
                        }
                    })
                },

                mounted: function() {
                    let appRoot = this.$children[0];
                    if (appRoot) {
                        appRoot.$on("comments.save", (e) => {
                            appRoot.comments[e.key] = e.comments;

                            if (opt.updateComments) {
                                opt.updateComments({
                                    key: e.detail.key,
                                    comments: e.detail.comments,
                                    target: item
                                });
                            }
                        });
                    }
                }
            });
        })



    }
}


Launcher.init(".json_editor", {
    updateComments: (e) => {
        console.log(e);
    }
});



/* eslint-disable no-new */