<template>
	<div class="editor-w clearfix">
		<div class="tab-wrap">
			<a @click="changeStatus('json')" :class="status.className.json">JSON VIEW</a>
			<a @click="changeStatus('text')" :class="status.className.text">TEXT VIEW</a>
		</div>
		<div class="content" v-if="status.mode == 'json'">
			<div class="editor">
				<JsonEditor :comments="comments" :objData="json" v-model="json"></JsonEditor>
			</div>
		</div>
		<div class="content" v-show="status.mode == 'text'">
			<textarea rows="20" :name="hidden" v-model="jsonText"></textarea>
		</div>
	</div>
</template>

<script>

export default {
	name: 'app',
	props: {
		jsonData: {
			default: {}
		},
		hidden:{
			default:""
		},
		comments: {
			default: {}
		}
	},
	data: function() {
		return {
			json: {},
			status: {
				mode: "json",
				className: {
					json: "tab active",
					text: "tab"
				}
			}
		}
	},

	computed: {
		jsonText: {
			get: function() {
				return JSON.stringify(this.json, null, 4);
			},
			set: function(value) {
				this.json = JSON.parse(value);
			}
		}
	},

	methods: {
		handleCommentsSave: function(e) {
			this.$emit("comments.save", e);
		},
		changeStatus: function(node){
			this.status.mode = node;
			this.status.className = {
				json: "tab",
				text: "tab"
			};
			this.status.className[node] = "tab active";
		}
	},

	mounted: function() {
		this.$el.addEventListener("commentssave", this.handleCommentsSave);
	},

	beforeDestroy: function() {
		this.$el.removeEventListener("commentssave", this.handleCommentsSave);
	},

	created: function() {
		this.json = this.jsonData;
	}
}
</script>

<style>
.clearfix {
	*zoom: 1;
}

.clearfix:before,
.clearfix:after {
	content: '';
	display: table;
}

.clearfix:after {
	clear: both;
}
.content {
	border: 1px solid gray;
	padding: 1em;
	background: #ffffff;
}
.content > textarea {
	padding: 0;
	margin: 0;
	border: 0;
	width: 100%;
}
.editor {
	max-width: 50%;
	padding: 0
}
.tab-wrap:after {
	content: "";
	display: table;
	clear: both;
}
.tab {
	border: 1px solid grey;
	padding: 0.5em 1em;
	display: inline-block;
	margin-bottom: -1px;
	border-bottom: 0;
	cursor: pointer;
}
.tab.active {
	background: white;
}
</style>


