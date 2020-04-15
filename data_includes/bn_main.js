PennController.ResetPrefix(null); // Initiates PennController

// BOTT & NOVECK TRIALS

Sequence("intro","consent", "demo","instructions", "Train", "end_train", rshuffle("test"), "send", "end")
// Sequence("demo","instructions", "Train", "send")


// This only works when I don't embed a DashedSentence in a newController()
var defaults = [
    "DashedSentence", {mode: "speeded acceptability", wordTime: 250}
    ];


newTrial("intro",
    defaultText
        .center()
        .print()
    ,
    newText("<p>Welcome to the Experiment!</p>")
    ,
    newText("<p>This experiment requires the use of a keyboard to register responses.</p>") 
    ,
    newText("<p>To participate in this experiment you MUST be on a laptop, desktop computer, or tablet device with a detachable keyboard.</p>")
    ,
    newText("<p>Do not use a cell phone, or tablet without detachable keyboard.</p>")
    ,
    newButton("Proceed to the Consent Form")
        .center()
        .print()
        .wait()
)
.setOption("hideProgressBar", true); // Do not show the progress bar on first screen

newTrial("consent",
    newHtml("consent.html")
        .log()
        .print()
    ,
    newTextInput("ID")
        .log()
        .before( newText("before", "<p>Please enter your unique participant ID</p>") )
        .center()
        .print()
    ,
    newText("warning", "Please enter your ID first")
        .color("red")
        .bold()
    ,
    newButton("consent button", "By clicking this button I indicate my consent")
        .center()
        .print()
        .wait(  // Make sure the TextInput has been filled
            getTextInput("ID")
                .testNot.text("")
                .failure( getText("warning").print() )
        )
    ,   // Create a Var element before going to the next screen
    newVar("ID")
        .global()          // Make it globally accessible
        .set( getTextInput("ID") )
)
.log( "ID" , getVar("ID") )
.setOption("hideProgressBar", true); // Do not show the progress bar on first screen

newTrial("demo",
    defaultText
        .center()
        .print()
    ,
    newTextInput("NativeLang")
        .log()
        .before( newText("before", "Please enter your native language.") )
        .center()
        .print()
    ,
    newText("warning", "Please enter your native language.")
        .color("red")
        .bold()
    ,
    newTextInput("OtherLangs")
        .before( newText("before", "Do you speak any other languages?") )
        .center()
        .print()
    ,
    newButton("Start")
        .center()
        .print()
        .wait(  // Make sure the TextInput has been filled
            getTextInput("NativeLang")
                .testNot.text("")
                .failure( getText("warning").print() )
        )
    ,
    newVar("NativeLang")
        .global()
        .set( getTextInput("NativeLang") )
    ,
    newVar("OtherLangs")
        .global()
        .set( getTextInput("OtherLangs") )
)
.log( "NativeLang" , getVar("NativeLang") )
.log( "OtherLangs" , getVar("OtherLangs") )
.setOption("hideProgressBar", true); // Do not show the progress bar on first screen


newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("<p>In this experiment, we will ask you to decide whether you agree or disagree with a statement.</p>")
    ,
    newText("<p>The statement will be revealed automatically, one word at a time.</p>")
    ,
    newText("<p>As each new word appears, the previous word will disappear.</p>")
    ,
    newText("<p>If you <strong>Agree</strong> with the sentence, press <strong>F</strong>. If you <strong>Disagree</strong>, then press <strong>J</strong><p>")
    ,
    newText("<p>Let's <strong>practice</strong> a few times before proceeding to the experiment.<p>")
    ,
    newButton("Click here when you're ready to Continue.")
        .center()
        .print()
        .wait()
)

Template( "train_table.csv", row =>
    [
    "Train",
    "DashedSentence", {s: row.Sentence},
    "PennController", newTrial("question",    
        newText("<p> Press <strong>F</strong> to <strong>Agree</strong> or <strong>J</strong> to <strong>Disagree</strong><p>")
            .center()
            .print()
        ,
        newText(row.Feedback)
            .center()
            .print()
            .log( "Feedback" , row.Feedback )
        ,
        newSelector()
            .add( newText("Agree"), newText("Disagree"))
            .keys("F", "J")
            .log("first")
            .wait()
        )
        .log( "ID" , getVar("ID") )
        .log( "Type" , row.Type )
        .log( "Sentence" , row.Sentence )
        .log( "Feedback" , row.Feedback )
    ]
)

// Template( "train_table.csv", row =>
//     newTrial("Train",
//         newText("<p><strong>PRACTICE</strong></p>")
//             .center()
//             .print()
//         ,
//         newController("DashedSentence", {s: row.Sentence})
//             .center()
//             .print()
//             .log()
//             .wait()
//         ,
//         newText("<p> Press <strong>F</strong> to <strong>Agree</strong> or <strong>J</strong> to <strong>Disagree</strong><p>")
//             .center()
//             .print()
//         ,
//         newText(row.Feedback)
//             .center()
//             .print()
//         ,
//         newSelector()
//             .add( newText("Agree"), newText("Disagree"))
//             .keys("F", "J")
//             .log("first")
//             .wait()
//     )
//     .log( "ID" , getVar("ID") )
//     .log( "Type" , row.Type )
//     .log( "Sentence" , row.Sentence )
//     .log( "Feedback" , row.Feedback )
// )



newTrial("end_train",
    defaultText
        .center()
        .print()
    ,    
    newText("<p>Great Job!</p>")
    ,
    newText("<p>Remember, Press the <strong>F</strong> key to Agree, or the <strong>J</strong> key to Disagree.</p>")
    ,
    newButton("Click here to start the experiment")
        .center()
        .print()
        .wait()
)

// This works to get speeded acceptability, but the results look weird
// Template( "bn_table.csv", row =>
//         ["test",
//         "DashedSentence", {s: `${row.Matrix} ${row.Quantifier} ${row[row.Subject.replace("Category",row.WhichCategory+'Category')]} are ${row[row.Predicate.replace("Category",row.WhichCategory+'Category')]}`},
//         "PennController", newTrial("question",    
//             newText("<p> Press <strong>F</strong> to <strong>Agree</strong> or <strong>J</strong> to <strong>Disagree</strong><p>")
//                 .center()
//                 .print()
//             ,
//             newSelector()
//                 .add( newText("Agree"), newText("Disagree"))
//                 .keys("F", "J")
//                 .log("first")
//                 .wait()
//         )
//         .log( "ID" , getVar("ID") )
//         .log( "SentNumber" , row.SentNumber )
//         .log( "Quantifier" , row.Quantifier )
//         .log( "Matrix" , row.Matrix )
//         .log( "WhichCategory" , row.WhichCategory )
//         .log( "Subject" , row.Subject )
//         .log( "Predicate" , row.Predicate )
//         .log( "SentType" , row.SentType )
//         .log( "Verb" , row.Verb )
//         .log( "Embedded" , row.Embedded )
//         .log( "Token" , row.Token )
//         .log( "MatchingCategory" , row.MatchingCategory )
//         .log( "MismatchingCategory" , row.MismatchingCategory )
//         .log( "Group"  , row.Group  )
//     ]
// )

// With this I cannot get speeded acceptability
Template( "bn_table.csv", row =>
        newTrial("test"
            newController("DashedSentence", {s: `${row.Matrix} ${row.Quantifier} ${row[row.Subject.replace("Category",row.WhichCategory+'Category')]} are ${row[row.Predicate.replace("Category",row.WhichCategory+'Category')]}`})
            .center()
            .print()
            .log()
            .wait()
        ,
            newText("<p> Press <strong>F</strong> to <strong>Agree</strong> or <strong>J</strong> to <strong>Disagree</strong><p>")
                .center()
                .print()
            ,
            newSelector()
                .add( newText("Agree"), newText("Disagree"))
                .keys("F", "J")
                .log("first")
                .wait()
        )
        .log( "ID" , getVar("ID") )
        .log( "SentNumber" , row.SentNumber )
        .log( "Quantifier" , row.Quantifier )
        .log( "Matrix" , row.Matrix )
        .log( "WhichCategory" , row.WhichCategory )
        .log( "Subject" , row.Subject )
        .log( "Predicate" , row.Predicate )
        .log( "SentType" , row.SentType )
        .log( "Verb" , row.Verb )
        .log( "Embedded" , row.Embedded )
        .log( "Token" , row.Token )
        .log( "MatchingCategory" , row.MatchingCategory )
        .log( "MismatchingCategory" , row.MismatchingCategory )
        .log( "Group"  , row.Group  )
)

SendResults( "send" )

newTrial("end",
    newText("<p>Thank you for your participation!</p>")
        .center()
        .print()
    ,
    newText("Your participation code is: 3bc8068f")
        .center()
        .print()
    ,
    newText("<p><a href='https://rutgerslinguistics.sona-systems.com/Default.aspx?ReturnUrl=%2f'>Click here to validate your participation.</a></p>")
        .center()
        .print()
    ,
    newButton("void")
        .wait()
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial


