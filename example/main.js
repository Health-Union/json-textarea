import Vue from 'vue'
import JsonEditor from '../src/index.js'
import App from './App.vue'
import { EventBus } from '../src/event-bus.js'

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

                created: function() {
                    EventBus.$on("comments.save", (e) => {

                        this.$children[0].comments[e.key] = e.comments;

                        e.target = item;

                        if (opt.updateCommonts) {
                            opt.updateCommonts(e);
                        }
                    })
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