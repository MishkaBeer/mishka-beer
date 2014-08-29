MishkaBeer
==========

# Install

## Pre-requisites

Required: 

* git
* nodejs
* ruby / sass
* [MongoDB](http://www.mongodb.org) : NoSQL document database
* [Grunt](http://gruntjs.com): Javascript Task Runner
* [Bower](http://bower.io): Web package manager
* [DaftMonk generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack): yeoman application generator and components sub-generators

## IDE / Text editor

You can use your favorite text editor or IDE. 

We use [Brackets Web editor](http://brackets.io) with the following plugins:

* [Exclude folders](https://github.com/gruehle/exclude-folders)
* Brackets Git
* Beautify (+ configure sass path: https://github.com/drewhamlett/brackets-beautify)
* Brackets Tree Extension Color
* Brackets code folding
* Emmet
* Indent guides
* Indentator
* AngularJS for brackets

## Get the code

You can clone a read-only version of the GitHub repository:

    git clone https://github.com/MishkaBeer/mishka-beer.git
    
To be able to push your commits to the project, use the read/write URL:

    git clone git@github.com:MishkaBeer/mishka-beer.git
    
You may have to generate a SSH key on your computer :

    ssh-keygen -C "your.email@adress.com" -t rsa
    
And add the content of your public key (~/.ssh/id_rsa.pub) to your [GitHub account keys](https://github.com/settings/ssh).

# Build the application

Install all dependencies using NPM and Bower:


    npm install
    bower install

# Start the application

Launch MongoDB database:
    
* Under Windows, as a service:

    
    ...\mongoDB\bin>mongod.exe --dbpath D:\travail\mishkabeer\mishka-beer\mongoDB\data\db

* Under Debian/Ubuntu:

    
    sudo service mongodb start
    
Launch grunt server:

    grunt serve

# Technical references

* [AngularJS API](https://docs.angularjs.org/api)
* [socket.io](http://socket.io)
* [Mongoose](http://mongoosejs.com): MongoDB object modeling for Node.js