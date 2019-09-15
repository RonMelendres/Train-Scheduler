var firebaseConfig = {
    apiKey: "AIzaSyC0j7oVHF8nlsWBZZOkqcryfyRnspaYVPs",
    authDomain: "train-scheduler-2c291.firebaseapp.com",
    databaseURL: "https://train-scheduler-2c291.firebaseio.com",
    projectId: "train-scheduler-2c291",
    storageBucket: "train-scheduler-2c291.appspot.com",
    messagingSenderId: "1019511425309",
    appId: "1:1019511425309:web:541dea984ce0681c6579f4"
};

firebase.initializeApp(firebaseConfig)

var database = firebase.database();

$(".add-train-button").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFreq = moment($("#frequency-input").val().trim(), ":mm").format("mm");
    var trainNext = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");

    var newTrain = {
        name: trainName,
        dest: trainDest,
        freq: trainFreq,
        next: trainNext,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.freq);
    console.log(newTrain.next);
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");


    function trainTimeCalculations() {

        var frequency = trainFreq;
        // var frequency = moment($("#frequency-input"));
        // var frequency = 5;
    
        var firstTime = trainNext;
        // var firstTime = moment($("#first-train-input")).format("HH:mm");
        // var firstTime = moment(currentTime).format("HH:mm:ss");
        // var firstTime = "5:30";
    
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        var currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("HH:mm:ss"));
    
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);
    
        var remainingTime = diffTime % frequency;
        console.log(remainingTime);
    
        var minutesTillTrain = frequency - remainingTime;
        console.log("Minutes till train: " + minutesTillTrain);
    
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));
    }
    trainTimeCalculations();

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
    
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().dest;
        var trainFreq = childSnapshot.val().freq;
        var trainNext = childSnapshot.val().next;
        
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFreq);
        console.log(trainNext);
        
        var trainFirstTime = moment.unix(trainNext).format("HH:mm:ss");
    
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainFreq),
            $("<td>").text(trainNext),
            $("<td>").text(trainFirstTime),
    
        );
    
        $("#train-table > tbody").append(newRow);
    
    });


});

// trainTimeCalculations();

// function trainTimeCalculations() {

//     var frequency = trainFreq;
//     // var frequency = moment($("#frequency-input"));
//     // var frequency = 5;

//     var firstTime = trainNext;
//     // var firstTime = moment($("#first-train-input")).format("HH:mm");
//     // var firstTime = moment(currentTime).format("HH:mm:ss");
//     // var firstTime = "5:30";

//     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     var currentTime = moment();
//     console.log("Current time: " + moment(currentTime).format("HH:mm:ss"));

//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("Difference in time: " + diffTime);

//     var remainingTime = diffTime % frequency;
//     console.log(remainingTime);

//     var minutesTillTrain = frequency - remainingTime;
//     console.log("Minutes till train: " + minutesTillTrain);

//     var nextTrain = moment().add(minutesTillTrain, "minutes");
//     console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));
// }

// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());

//     var trainName = childSnapshot.val().name;
//     var trainDest = childSnapshot.val().dest;
//     var trainFreq = childSnapshot.val().freq;
//     var trainNext = childSnapshot.val().next;
    
//     console.log(trainName);
//     console.log(trainDest);
//     console.log(trainFreq);
//     console.log(trainNext);
    
//     var trainFirstTime = moment.unix(trainNext).format("HH:mm:ss");

//     var newRow = $("<tr>").append(
//         $("<td>").text(trainName),
//         $("<td>").text(trainDest),
//         $("<td>").text(trainFreq),
//         $("<td>").text(trainNext),
//         $("<td>").text(trainFirstTime),

//     );

//     $("#train-table > tbody").append(newRow);

// });