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
     min: 4,
     max: 9,
     value: 7,
     change: function( event, ui ) {
       selectedIntensity(ui.value);
     }
    });

/* vars that control DOM if statement display + hides */

var selectedWorkout = ko.observable(); // auto default 60
var todaysWorkout = ko.observable(0); // default hidden

// the magic

    var firstCircuit = ko.observableArray();
    var secondCircuit = ko.observableArray();
    var thirdCircuit = ko.observableArray();

    /* -- the categories -- */
    var limitedExerciseCats = ['plyo','push','pull','core'];
    var allExerciseCats = ['plyo','push','pull','core','legs'];

    /* -- verbose intensity filter -- */

    var filteredIntensity = ko.observableArray();

    function filterByIntensity(correction){
        filteredIntensity.removeAll(); // clear previous filter

        correctedIntensity = selectedIntensity() + correction;

        var intensityRange = [correctedIntensity-1,correctedIntensity,correctedIntensity+1];
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

    /* -- clear all workout circuits -- */
    function clearCircuits(){
      firstCircuit.removeAll();
      secondCircuit.removeAll();
      thirdCircuit.removeAll();
    }

    /* -- generate a circuit based on passed in categories -- */

    function generateCircuit(circuitArray, exerciseCategories, intensityCorrection) {
      filterByIntensity(intensityCorrection);

      /** --  loop through needed categories and
              push a filtered sample into firstCircuit -- **/

      jQuery(exerciseCategories).each(function(index){
        var filteredList = _.where(filteredIntensity(), {category: exerciseCategories[index]});
        if (filteredList.length >= 1 ){
          var randomExercise = _.sample(filteredList);
          if (randomExercise){
            circuitArray.push(randomExercise);
          }
        }
        else {
          console.log('need more ' + exerciseCategories[index]);
        }
      });

      /* -- randomize order -- */
      circuitArray.sort(function() { return 0.5 - Math.random() });
    }

/* -- when the generate button is clicked -- */

$('#generate').click(function(){
  todaysWorkout(0);
  clearCircuits();

  switch (selectedWorkout()) {
    case 1:
      generateCircuit(firstCircuit(), limitedExerciseCats, 0);
      todaysWorkout(1);
      break;
    case 2:
      generateCircuit(firstCircuit(), allExerciseCats, -1);
      generateCircuit(secondCircuit(), allExerciseCats, 0);
      todaysWorkout(1);
      break;
    case 3:
      generateCircuit(firstCircuit(), allExerciseCats, 0);
      generateCircuit(secondCircuit(), allExerciseCats, +1);
      generateCircuit(thirdCircuit(), allExerciseCats, -1);
      todaysWorkout(1);
      //console.log(firstCircuit()[1].intensity);
      //console.log(secondCircuit()[1].intensity);
      //console.log(thirdCircuit()[1].intensity);
      //console.log('---');
      break;
    default:
      alert('Please select how many circuits you would like to do.')
  }

});

ko.applyBindings(viewModel);
