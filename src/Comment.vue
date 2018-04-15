<template>
   <p class="comments-tip">
       <span v-if="!status.editable"><strong>{{comments}}</strong>  {{getCommentPath()}}
            <a @click="edit"><i class="icon-pencil"></i></a>
        </span>
        <span v-if="status.editable">
            <input type="text" v-model="shadow.comments">
            <a @click="save"><i class="icon-ok"></i></a>
            <a @click="cancel"><i class="icon-cancel"></i></a>
        </span>
    </p>
</template>
<style> 
.comments-tip {
    position: absolute;
    top: 0;
    left: 100%;
    padding-left: 1em;
    width: 100%;
    transition: opacity .4s ease;
    opacity: 0.6;
    color: gray;
    font-style: italic;
    font-weight: 400;
}
.comments-tip:hover {
    opacity: 1;
}
.comments-tip > span {
    background: white;
}
.comments-tip > span > strong {
    color:#0b8e6b;
    font-weight: 400;
}
</style>
<script>
export default {
    name: 'Comment',
    props: {
        commentsData: {
            default: {}
        },
        item: {},
        path: null
    },
    data: function() {
        return {
            comments: "",
            shadow:{
                comments: ""
            },
            status: {
                editable: false
            }
        }
    },
    mounted: function() {
        this.comments = this.commentsData[this.getCommentPath()] || "";
    },
    methods: {
        getCommentPath: function() {
            return '$.' + (this.path || '');
        },
        edit: function() {
            this.status.editable = true;
            this.shadow.comments = this.comments;
        },
        cancel: function() {
            this.status.editable = false;
            this.shadow.comments = this.comments;
        },
        save: function() {
            this.status.editable = false;
            this.comments = this.shadow.comments;

            let event = new CustomEvent("commentssave", { 
                bubbles: true,
                detail: {
                    comments: this.comments,
                    key: this.getCommentPath()
                }
            });

            this.$el.dispatchEvent(event);
        }
    }
}
</script>
