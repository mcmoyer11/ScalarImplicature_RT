PennController.ResetPrefix(null); // Initiates PennController

// BOTT & NOVECK TRIALS

Sequence("intro", randomize("trial"), "send", "final")

newTrial("intro",
    
    defaultText
        .print()
    ,    
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will have to report whether you agree or disagree with a statement.</p>")
    ,
    newText("<p>Press the <strong>F</strong> key to Agree, or the <strong>J</strong> key to Disagree.</p>")
    ,
    newText("<p>Please enter your SONA ID and then click the button below to start the experiment.</p>")
    ,
    newTextInput("inputID")
        .print()
    ,
    newButton("Start the experiment")
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)

.log( "ID" , getVar("ID") )

// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ID")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "ID" , getVar("ID") )
// This log command adds a column reporting the participant's name to every line saved to the results


Template( "bn_table.csv", row =>
    newTrial( "trial",
        newTimer(500)
            .start()
            .wait()
        ,
        newText("sentence", `${row.Matrix} ${row.Quantifier} ${row[row.Subject.replace("Category",row.WhichCategory+'Category')]} are ${row[row.Predicate.replace("Category",row.WhichCategory+'Category')]}` )
            .print()
        ,
        newText("<p> Press <strong>F</strong> to <strong>Agree</strong> or <strong>J</strong> to <strong>Disagree</strong><p>")
            .print()
        ,
        newSelector()
            .add( newText("Agree"), newText("Disagree"))
            .keys("F", "J")
            .log()
            .wait()
        ,
        newTimer(500)
            .start()
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
        .print()
    ,
    newText("Your participation code is: 3bc8068f")
        .print()
    ,
    newText("<p><a href='https://rutgerslinguistics.sona-systems.com/Default.aspx?ReturnUrl=%2f'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial


