var Model = function() {
  this.QUESTIONS = [
  {
      text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
      answers: [
          '0815',
          '2B',
          'BAM128',
          'Barely'
      ],
      correct: 0
  },
  {
      text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
      answers: [
          '0815',
          '2B',
          'BAM128',
          'Barely'
      ],
      correct: 1
  },
  {
      text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
      answers: [
          '0815',
          '2B',
          'BAM128',
           'Barely'
       ],
       correct: 2
   },
   {
       text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
       answers: [
           '0815',
           '2B',
           'BAM128',
           'Barely'
       ],
       correct: 3
   }
  ];
  this.nextQuestion = null;
};

Model.prototype.setQuestion = function(questionIndex) {
  var question = this.QUESTIONS[questionIndex];
  if(this.nextQuestion) {
    this.nextQuestion(question, questionIndex);
  }
};

Model.prototype.getQuestionLength = function() {
  return this.QUESTIONS.length;
};

Model.prototype.Correct = function(choice, questionIndex) {
  if(choice === this.QUESTIONS[questionIndex].correct)
    return true;
  else return false;
};

var View = function() {
  this.questionsPageElement = $('.questions-page');
  this.questionCurrentElement = $('.question-current');
  this.questionsTotalElement = $('.questions-total');
  this.questionElement = $('.question');
  this.answersElement = $('.answers');

  this.resultsPageElement = $('.results-page');
  this.scoreElement = $('.score');
  this.restartButtonElement = $('.restart-button');

  this.answersElement.on('click', this.answerBtnClick.bind(this));
  this.restartButtonElement.on('click', this.restartBtnClick.bind(this));
  this.getQuestionLength = null;
  this.setQuestion = null;
  this.Correct = null;
};

View.prototype.nextQuestion = function(question, questionIndex) {
  this.questionCurrentElement.text(questionIndex);
  this.questionElement.text(question.text);
  this.answersElement.empty();
  for (var i=0; i<question.answers.length; i++) {
      var answer = question.answers[i];
      this.answersElement.append('<li><button type="button">' + answer + '</button></li>');
  }
};

View.prototype.answerBtnClick = function(event) {
  console.log(event);
  var choice = $(event.target).parent().index();
  var questionIndex = parseInt(this.questionCurrentElement.text(), 10);
  if(this.Correct) {
    if(this.Correct(choice, questionIndex)) {
      this.increaseScore();
    }
  }
  if(this.getQuestionLength) {
    if(questionIndex + 1 < this.getQuestionLength()) {
      if(this.setQuestion)
        this.setQuestion(questionIndex + 1);
    }
    else this.showResults();
  }
};

View.prototype.showResults = function() {
  this.questionsPageElement.hide();
  this.resultsPageElement.show();
};

View.prototype.showQuestions = function() {
  this.resultsPageElement.hide();
  this.questionsPageElement.show();
};

View.prototype.resetScore = function() {
  this.scoreElement.text(0);
};

View.prototype.increaseScore = function() {
  var score = parseInt(this.scoreElement.text(), 10);
  this.scoreElement.text(score + 1);
};

View.prototype.restartBtnClick = (function() {
  if(this.setQuestion)
    this.setQuestion(0);
  this.resetScore();
  this.showQuestions();
});

var Controller = function(model, view) {
  model.nextQuestion = view.nextQuestion.bind(view);
  view.setQuestion = model.setQuestion.bind(model);
  view.getQuestionLength = model.getQuestionLength.bind(model);
  view.Correct = model.Correct.bind(model);
};

$(document).ready(function() {
  var model = new Model();
  var view = new View();
  var controller = new Controller(model, view);
  if(view.getQuestionLength) {
    view.questionsTotalElement.text(view.getQuestionLength());
  }
  model.setQuestion(0);
});

