# eslint-plugin-import-path

A tiny ESLint plugin to check import paths for errors. Currently it allows you do two simple things:
check strings for regexes (you can define these) and check imports depth.

WebStorm sometimes tends to do weird things - it does not respect module root sometimes and adds something
like `../../../../stores/SettingStore` instead of `stores/SettingStore` - and also it sometimes adds 
`/index` to the end of filenames after refactoring - so my `import Component from 'Component'` turns
into `import Component from 'Component/index'`. I tend to miss these and I don't like to see them in
my code.

There's a gorgeous `eslint-plugin-import`, but it lacked these two simple features, so I wrote this one.
It is even somewhat covered with unit tests and should be stable enough to use during development.

## Usage

Install it: (of course you have to have eslint installed)

    npm install eslint-plugin-import-path --save-dev

Add `import-path` to the plugins section of your `.eslintrc` configuration file.

    {
      "plugins": ["import-path"]
    }

Configure the rules you need in rules section of .eslintrc.

    {
      "plugins": ["import-path"],
      
      "rules": {
        "import-path/parent-depth": ["warn", 2],
        "import-path/forbidden": ["error", ["/index$"]]
      }
    }

## Rules

#### import-path/forbidden

Basically a regex match. Lets you specify a regex string (or a number of them) to highlight import paths
that match it. Couple examples:
    
You can simply pass a regex string as a second argument:
    
    "import-path/forbidden": ["warning", "/index$"]

Or an array of regex strings:    

    "import-path/forbidden": ["error", ["/index$", "badword"]]
    
Or an array of objects. In case you use objects - its `match` property should contain regex string.
You can also provide `message` to be displayed for this very match    
    
    "import-path/forbidden": ["warning", [
      {
        "match": "/index$",
        "message": "Index on the end of path is redundant"
      }
    ]]
    
With objects can also use `contains` prop to define a string that will be checked for occurrence. It
is not a regex, but a simple string the path will be checked for.
    
    "import-path/forbidden": ["warning", [
      {
        "contains": "badword",
        "message": "Do not use paths containing 'badword'"
      },
    ]]

#### import-path/parent-depth

The rule checks if you used too many parent directory references. 

Following rule:

    "import-path/parent-depth": ["warn", 4]
    
Will cause a warning here:

    import whatever from '../../../../../something';
    
...but won't cause it here:

    import whatever from '../../something'
    
...Of course, you could achieve this using `forbidden` rule, too:

    "import-path/forbidden": ["warning", [
      {
        "match": "^(\.\./){2,}",
        "message": "More than two parent directories referenced"
      },
    ]]

