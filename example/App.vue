<template>
	<div class="editor-w clearfix">
		<div class="tab-wrap">
			<a @click="changeStatus('json')" :class="status.className.json">JSON VIEW</a>
			<a @click="changeStatus('text')" :class="status.className.text">TEXT VIEW</a>
		</div>
		<div class="content" v-if="status.mode == 'json'">
			<div class="editor">
				<JsonEditor :objData="jsonData" v-model="jsonData" ></JsonEditor>
			</div>
		</div>
		<div class="content" v-if="status.mode == 'text'">
			<textarea rows="20" v-model="jsonText"></textarea>
		</div>
	</div>
</template>

<script>

export default {
	name: 'app',
	data: function() {
		return {
			status: {
				mode: "json",
				className: {
					json: "tab active",
					text: "tab"
				}
			},
			jsonData: {
				name: 'jinkin',
				age: 12,
				address: ['Panyu Shiqiao on Canton', 'Tianhe', {
					namll: 'world inside',
					city: 'forida meta 11'
				}, ['nammm', 'fefasas', 'cadasda'], {
					ge: 'asdasdasd',
					grqq: 'adsadasdsad'
				}],
				ohters: {
					id: 1246,
					joinTime: '2017-08-20. 10:20',
					description: 'another man'
				}
			}
		}
	},

	computed: {
		jsonText: {
			get: function() {
				return JSON.stringify(this.jsonData, null, 4);
			},
			set: function(value) {
				this.jsonData = JSON.parse(value);
			}
		}
	},

	methods: {
	
		//JSON format print
		formatJson: function(txt, compress /*是否为压缩模式*/) {
			/* 格式化JSON源码(对象转换为JSON文本) */
			var indentChar = "  ";
			if (/^\s*$/.test(txt)) {
				console.error("数据为空,无法格式化! ");
				return;
			}
			try {
				var data = eval("(" + txt + ")");
			} catch (e) {
				throw ("数据源语法错误,格式化失败! 错误信息: " + e.description, "err");
				return;
			}
			var draw = [],
				last = false,
				This = this,
				line = compress ? "" : "\n",
				nodeCount = 0,
				maxDepth = 0;

			var notify = function(name, value, isLast, indent /*缩进*/, formObj) {
				nodeCount++; /*节点计数*/
				for (var i = 0, tab = ""; i < indent; i++) tab += indentChar; /* 缩进HTML */
				tab = compress ? "" : tab; /*压缩模式忽略缩进*/
				maxDepth = ++indent; /*缩进递增并记录*/
				if (value && value.constructor == Array) {
					/*处理数组*/
					draw.push(
						tab + (formObj ? '"' + name + '":' : "") + "[" + line
					); /*缩进'[' 然后换行*/
					for (var i = 0; i < value.length; i++)
						notify(i, value[i], i == value.length - 1, indent, false);
					draw.push(
						tab + "]" + (isLast ? line : "," + line)
					); /*缩进']'换行,若非尾元素则添加逗号*/
				} else if (value && typeof value == "object") {
					/*处理对象*/
					draw.push(
						tab + (formObj ? '"' + name + '":' : "") + "{" + line
					); /*缩进'{' 然后换行*/
					var len = 0,
						i = 0;
					for (var key in value) len++;
					for (var key in value) notify(key, value[key], ++i == len, indent, true);
					draw.push(
						tab + "}" + (isLast ? line : "," + line)
					); /*缩进'}'换行,若非尾元素则添加逗号*/
				} else {
					if (typeof value == "string") value = '"' + value + '"';
					draw.push(
						tab +
						(formObj ? '"' + name + '":' : "") +
						value +
						(isLast ? "" : ",") +
						line
					);
				}
			};
			var isLast = true,
				indent = 0;
			notify("", data, isLast, indent, false);
			return draw.join("");
		},

		changeStatus: function(node){
			this.status.mode = node;
			this.status.className = {
				json: "tab",
				text: "tab"
			};
			this.status.className[node] = "tab active";
		}
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


