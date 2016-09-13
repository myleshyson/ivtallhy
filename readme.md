# MadMouse Creative Base Foundation Theme

##Intro

This is the starter theme for all of our projects that uses gulp, git, and sass! 

To get started, download the zip file of this theme. Once downloaded and placed in your themes directory, run npm install to install all of the dependencies! 

You'll notice that there is no style.css. After you run npm install, run gulp, and the style.css as well as some core js files will be compiled. 

##Getting Started

Some requirements are needed for this theme to work. First, make sure to have Node.js and npm installed on your machine. Here is the link to the website. It should only take a second. 
[node.js](https://nodejs.org/en/download/)

Once installed run 
```
#!php

node -v
```

You should see something link this in the terminal.

```
#!php

v4.2.3
```

Npm comes with Node, but to make sure you have the most current version run 

```
#!php

sudo npm install npm -g
```


Download this theme into your themes directory in wordpress. Once downloaded, cd into this themes directory and run 

```
#!php

npm install
```

This will install all of the necessary files to use foundation and gulp. It will probably take a little bit. Finally, after npm is done installing run

```
#!php

gulp
```
And voila! This compiles all of the files in the assets directory.

## Using Gulp ##

This theme uses laravel elixer to run gulp. It's super simple. Everytime you run gulp, all of the files in the assets directory will be compiled into the public directory. The sass files compile into style.css in the root of the theme. 

Running gulp everytime you make a change can get annoying. Run 

```
#!php

gulp watch
```
In order for files to automatically update. Reloading the page everytime you make a change get's annoying as well. Uncomment mix.browsersync in your gulpfile.js in order to have the browser automatically reload whenver you make a change.

Run 
```
#!php

gulp --production
```

In order to minify all files. 


In order to use gulp with images. Add an img folder in your assets directory, and whenever you run gulp it will minify all the images and output them to an img folder in the public directory.

To compile css, go to the gulpfile.js and uncomment mix.styles(). Create a css folder in assets and add the files that you would like to compile. It automatically uses assets/css as root path compiles your css into all.css. 


Of course, you can make this file however you like. Go to the [laravel elixer](https://laravel.com/docs/5.2/elixir) site and make your own custom gulpfile.js.

## Functions ##


The functions.php file is cleaned up. All of the functions can be found in the components directory. You many add your own functions as well. 

