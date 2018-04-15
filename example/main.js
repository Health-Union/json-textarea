import Vue from 'vue'
import JsonEditor from '../src/index.js'
import App from './App.vue'

Vue.use(JsonEditor);

export const Launcher = {
    /**
     * @param string selector
     * @param object options {updateCommonts: callback({key:key, comments:comments, target:ele})}
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
                    let field = item.getAttribute("name") || "";

                    return h(App, {
                        props: {
                            jsonData: JSON.parse(item.innerHTML) || {},
                            comments: opt.comments[field] || {},
                            hidden: field
                        }
                    })
                },

                mounted: function() {
                    let appRoot = this.$children[0];
                    if (appRoot) {
                        appRoot.$on("comments.save", (e) => {
                            appRoot.comments[e.key] = e.comments;

                            if (opt.updateCommonts) {
                                opt.updateCommonts({
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
    updateCommonts: (e) => {
        console.log(e);
    }
});



/* eslint-disable no-new */