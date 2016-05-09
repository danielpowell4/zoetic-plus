var EXERCISES;

$.ajax({
  dataType: "json",
  url: '/exercises.json',
  success: function(data) {
    EXERCISES = data;
    //console.log(EXERCISES);
  }
});

/* ----- Initalize the intensitySlider ----- */

var viewModel = {};
var selectedIntensity = ko.observable(7);

    $( "#intensitySlider" ).slider({
     min: 1,
     max: 10,
     value: 7,
     change: function( event, ui ) {
       selectedIntensity(ui.value);
     }
    });

/* vars that control DOM if statement display + hides */

var selectedWorkout = ko.observable(); // auto default 60
var todaysWorkout = ko.observable(0); // default hidden

// the magic

    var todaysFifteenWorkout = ko.observableArray(); // initalize active workout holder
    var todaysFirstCircuit = ko.observableArray();
    var todaysSecondCircuit = ko.observableArray();
    var todaysThirdCircuit = ko.observableArray();

    /* -- verbose intensity filter -- */

    var filteredIntensity = ko.observableArray();

    function filterByIntensity(){
        filteredIntensity.removeAll(); // clear previous filter

        var intensityRange = [selectedIntensity()-1,selectedIntensity(),selectedIntensity()+1];
        var justLess = _.where(EXERCISES, {"intensity": intensityRange[0]});
        var same = _.where(EXERCISES, {"intensity": intensityRange[1]});
        var justMore = _.where(EXERCISES, {"intensity": intensityRange[2]});

        for(var i=0; i<justLess.length; i++){
          filteredIntensity.push(justLess[i])
        };

        for(var i=0; i<same.length; i++){
          filteredIntensity.push(same[i])
        };
        for(var i=0; i<justMore.length; i++){
          filteredIntensity.push(justMore[i])
        };
    }

    /* -- end intensity Filter -- */

    /* -- assign ko.observables needed for 15 min workout -- */
    function generateFifteen() {

      filterByIntensity();
      todaysFifteenWorkout.removeAll(); // clear todaysWorkout

      /* set up needed categories */
      var catsForFifteen = ['plyo','push','pull','core'];
      var catsForFifteenLength = catsForFifteen.length;

      /** --  loop through needed categories and
              push a filtered sample into todaysWorkout -- **/

      for(var i=0; i<catsForFifteenLength; i++){
        var filteredList = _.where(filteredIntensity(), {category: catsForFifteen[i]});
        var randomExercise = _.sample(filteredList);
        todaysFifteenWorkout.push(randomExercise);
      }

      todaysFifteenWorkout.sort(function() { return 0.5 - Math.random() });


    }

    /* assign variables needed for 45 min */
    function generateFourtyFive(){
      todaysFirstCircuit.removeAll();   // clearWorkout
      todaysSecondCircuit.removeAll();  // clearWorkout

        /* set up needed categories */
        var catsForFourtyFive = ['plyo','push','pull','core','legs'];
        var catsForFourtyFiveLength = catsForFourtyFive.length;

        /** --  loop through needed categories and
                push a filtered sample into todaysWorkout -- **/

        for(var i=0; i<catsForFourtyFiveLength; i++){
          var filteredList = _.where(filteredIntensity(), {category: catsForFourtyFive[i]});
          var randomExercise = _.sample(filteredList);
          todaysFirstCircuit.push(randomExercise);
        }

        for(var i=0; i<catsForFourtyFiveLength; i++){
          var filteredList = _.where(filteredIntensity(), {category: catsForFourtyFive[i]});
          var randomExercise = _.sample(filteredList);
          todaysSecondCircuit.push(randomExercise);
        }

        /* randomize order of the workouts */
        todaysFirstCircuit.sort(function() { return 0.5 - Math.random() });
        todaysSecondCircuit.sort(function() { return 0.5 - Math.random() });

    }

    function generateSixty(){
      todaysFirstCircuit.removeAll();   // clearWorkout
      todaysSecondCircuit.removeAll();  // clearWorkout
      todaysThirdCircuit.removeAll();  // clearWorkout

        /* set up needed categories */
        var catsForSixty = ['plyo','push','pull','core','legs'];
        var catsForSixtyLength = catsForSixty.length;

        /** --  loop through needed categories and
                push a filtered sample into todaysWorkout -- **/

        // First Circuit
        for(var i=0; i<catsForSixtyLength; i++){
          var filteredList = _.where(filteredIntensity(), {category: catsForSixty[i]});
          var randomExercise = _.sample(filteredList);
          todaysFirstCircuit.push(randomExercise);
        }
        // Second Circuit
        for(var i=0; i<catsForSixtyLength; i++){
          var filteredList = _.where(filteredIntensity(), {category: catsForSixty[i]});
          var randomExercise = _.sample(filteredList);
          todaysSecondCircuit.push(randomExercise);
        }
        // Third Circuit
        for(var i=0; i<catsForSixtyLength; i++){
          var filteredList = _.where(filteredIntensity(), {category: catsForSixty[i]});
          var randomExercise = _.sample(filteredList);
          todaysThirdCircuit.push(randomExercise);
        }

        /* randomize order of the workouts */
        todaysFirstCircuit.sort(function() { return 0.5 - Math.random() });
        todaysSecondCircuit.sort(function() { return 0.5 - Math.random() });
        todaysThirdCircuit.sort(function() { return 0.5 - Math.random() });

    }

$('#generate').click(function(){
  todaysWorkout(0);
  generateFifteen();
  generateFourtyFive();
  generateSixty();
  todaysWorkout(1);

});

ko.applyBindings(viewModel);
