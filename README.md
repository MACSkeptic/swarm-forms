# swarm forms

swarm forms is a project we created to experiment with game mechanics and canvas.

a live version (may not be the latest) of this can be found [here](http://swarm-forms.herokuapp.com/).

## running

requirements:

* node ~> 0.8
* npm ~> 1.1

to run it, simply:

```
npm install
node app
```

## tests

the test suite uses qunit since it suffers way less from passive (which can be read:
overhead, unnecessary and obsolete) language constructs like 'should'.

a live version (may not be the latest) of this can be found [here](http://swarm-forms.herokuapp.com/js/tests/all.html)

this is automatically built using the amazing [travis ci](https://travis-ci.org/MACSkeptic/swarm-forms/builds)

[![Build Status](https://travis-ci.org/MACSkeptic/swarm-forms.png?branch=master)](https://travis-ci.org/MACSkeptic/swarm-forms)

### with grunt

requirements:

* grunt cli (`npm install -g grunt-cli`)

to run the tests:

```
grunt
```

### on the browser

`node app` then visit `localhost:3000/js/tests/all.html`

## wanna help?

* leave a comment telling why our code is bad (or good)
* check our open issues (https://github.com/MACSkeptic/swarm-forms/issues?state=open)
* submit a pull request (https://github.com/MACSkeptic/swarm-forms/pulls)

## premises

most of it is focused on creating things from scratch instead of relying on engines
and frameworks.

the reasoning behind it is by no means because we think that is necessarily the best
approach, but instead it forces us to learn about problems and solutions that are
specific to game development.

## inspiration sources

some things that greatly influenced us from design, mechanics and just from being flat out awe inspiring artistic pieces:

* binding of isaac
* cave story (+ soundtrack)
