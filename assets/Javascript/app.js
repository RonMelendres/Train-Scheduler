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
    var trainFreq = $("#frequency-input").val().trim();
    var trainNext = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");

    var newTrain = {
        name: trainName,
        dest: trainDest,
        freq: trainFreq,
        next: trainNext,
    };

    database.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.dest);
    // console.log(newTrain.freq);
    // console.log(newTrain.next);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFreq = childSnapshot.val().freq;
    var trainNext = childSnapshot.val().next;

    // console.log(trainName);
    // console.log(trainDest);
    // console.log(trainFreq);

    var trainFirstTime = moment.unix(trainNext).format("HH:mm:ss");

    var frequency = trainFreq;

    var firstTime = trainNext;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    var currentTime = moment();
    // console.log("Current time: " + moment(currentTime).format("HH:mm:ss"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("Difference in time: " + diffTime);

    var remainingTime = diffTime % frequency;
    // console.log(remainingTime);

    var minutesTillTrain = frequency - remainingTime;
    // console.log("Minutes till train: " + minutesTillTrain);

    var nextArrival = moment().add(minutesTillTrain, "minutes").format("HH:mm");
    // console.log("Arrival time: " + moment(nextArrival).format("HH:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesTillTrain),

    );

    $("#train-table > tbody").append(newRow);

});