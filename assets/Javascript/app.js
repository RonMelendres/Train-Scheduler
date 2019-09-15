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
    var trainFirst = moment($("#first-train-input").val().trim(), "hh:mm:ss").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        dest: trainDest,
        first: trainFirst,
        freq: trainFreq
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    // console.log(newTrain.first);
    console.log(newTrain.freq);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

trainTimeCalculations();

function trainTimeCalculations() {
    var frequency = moment($("#frequency-input"), "hh:mm:ss");
    // var frequency = 5;

    var firstTime = moment($("#first-train-input"), "hh:mm:ss");
    // var firstTime = "5:30";

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm:ss"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var remaindingTime = diffTime % frequency;
    console.log(remaindingTime);

    var minutesTillTrain = frequency - remaindingTime;
    console.log("Minutes till train: " + minutesTillTrain);

    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));
}

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    var trainFirstTime = moment.unix(trainFirst).format("hh:mm:ss");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(trainFirst),
        $("<td>").text(trainFirstTime),

    );

    $("#train-table > tbody").append(newRow);

});