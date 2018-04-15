# JSON textarea

visual JSON editor with comments

fork from [Vue-Json-Edit](https://github.com/jinkin1995/vue-json-edit)

[Online Demo](https://mm-sam.github.io/json-textarea/)

## Usage

``` html

<textarea name="hello" class="json_editor">
    [1, 2, 3, "Hello"]
</textarea>

<script src="path/of/json-textarea.js"></script>
  
```

OR

``` html

<textarea name="json" class="my-class">
    [1, 2, 3, "Hello"]
</textarea>

<script src="path/of/json-textarea.js"></script>
<script>
    JSONTextArea.Launcher.init(".my-class", {
        comments: {}, //comments data
        /**
         * comments save callback
         **/
        updateComments: function(e) {
            //do something
        }
    })
</script>
  
```

## Options

- comments:

``` json
{
    "json path": "comments text"
    //....
}
```

- updateComments:

``` javascript
updateComments : function (e) {
    console.log(e.key); //JSON path
    console.log(e.comments); //comments text
    console.log(e.target); //textarea element
}

```
