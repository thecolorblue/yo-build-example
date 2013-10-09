'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    console.log('Everything is done. You can now continue living the tread life.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BuildGenerator, yeoman.generators.Base);

BuildGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('Welcome to the DT build tool.');
  console.log('Everything is automated here, we just have a couple questions.');
  console.log(' ');

  var prompts = [
    {
      type: 'list',
      name: 'dow',
      message: 'Day of the week?',
      default: 'WKD',
      choices: [
        'WKD',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
        'SUN'
      ]
    },
    {
      type: 'list',
      name: 'codebase',
      message: 'what codebase is this for?',
      choices: [
        'SQL',
        'V3I',
        'V3E',
        'V4',
        'V5',
        'DRSG',
        'B2C',
        'LIB',
        'ES',
        'IA',
        'DMS',
        'BAT'
      ]
    },
    {
      name: 'projectNumber',
      message: 'What is your project number?'
    },
    {
      name: 'description',
      message: 'Ticket description?'
    },
    {
      name: 'devInitials',
      message: 'Developers initials?'
    },
    {
      name: 'baInitials',
      message: 'Business analyst initials?'
    },
    {
      name: 'revisionNumbers',
      message: 'What are the (demo) revision numbers?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.dow = props.dow;
    this.codebase = props.codebase;
    this.projectNumber = props.projectNumber;
    this.description = props.description;
    this.devInitials = props.devInitials;
    this.baInitials = props.baInitials;
    this.revisionNumbers = props.revisionNumbers;

    cb();
  }.bind(this));
};

BuildGenerator.prototype.app = function app() {
  this.title = this.dow + '_' +
               this.codebase + '_' +
               this.projectNumber + '_' +
               this.description + '_' +
               this.devInitials + '_' +
               this.baInitials;
  this.docTitle = this.projectNumber + '_' +
                  this.description + '_' +
                  this.devInitials + '_' +
                  this.baInitials;

  this.template('_docTemplate.txt', this.title + '/SVN/Documentation/' + this.docTitle + '.txt');
};

