# esh | elastic query shell

esh is a simple [elasticsearch][elastic] plugin which allows you to write your queries with the awesome [ace editor][ace].

![esh](/docs/esh.png)

## installation

    # in your elasticsearch directory
    bin/plugin --install lefloh/esh
    
esh should be available under [http://localhost:9200/_plugin/esh][esh].

## note

I don't know if I would have invested time in this project if I would have known [Sense][sense] before. 
Maybe you should take a look at [Marvel][marvel] or the [unofficial Chrome plugin][chrome].

## development

### prerequisites

You need to install:

 * [NPM][npm]
 * [Bower][bower]
 * [Grunt][grunt]
 * [Docker][docker]
 * [Docker Compose][compose]

### build

    # initial setup
    docker-compose build && docker-compose up
    npm install && bower install
   
    # we have three grunt tasks:
    
    # populate elasticsearch with some data
    grunt testdata
    # start local connect server 
    grunt dev
    # default task builds the _site 
    grunt

As the plugin should be installed via github directly the `_site` folder is part of the commited sources. 
The default grunt task must be run before every commit.

 [elastic]: https://www.elastic.co
 [ace]: http://ace.c9.io/
 [esh]: http://localhost:9200/_plugin/esh
 [sense]: https://www.elastic.co/guide/en/marvel/current/dashboards.html#sense
 [marvel]: https://www.elastic.co/products/marvel
 [chrome]: https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig
 [npm]: https://www.npmjs.com/
 [bower]: http://bower.io/
 [grunt]: http://gruntjs.com/
 [docker]: https://www.docker.com/
 [compose]: https://docs.docker.com/compose/