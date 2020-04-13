PennController.ResetPrefix(null); // Initiates PennController

// CHEMLA & BOTT TRIALS

Sequence("intro","consent", "demo","instructions", "trainT", "trainF", "end_train", randomize("trial"), "send", "final")

newTrial("intro",
    defaultText
        .center()
        .print()
    ,
    newText("<p>Welcome to the Experiment!</p>")
    ,
    newText("<p>This experiment requires the use of a keyboard to register responses, so to participate in this experiment you MUST be on a laptop, desktop computer, or tablet device with a detachable keyboard. NOT a cell phone or tablet without detachable keyboard.</p>")
    ,
    newButton("Proceed to the Consent Form")
        .center()
        .print()
        .wait()
)

newTrial("consent",
    newHtml("consent.html")
        .log()
        .print()
    ,
    newButton("consent button", "By clicking this button I indicate my consent")
        .center()
        .print()
        .wait()
)

newTrial("demo",
    defaultText
        .center()
        .print()
    ,
    newText("<p>Please enter your Participant ID.</p>")
    ,
    newTextInput("inputID")
        .inputWarning("We would like you to type some text in these fields")
        .print()
    ,
    newText("<p>What is your native language?</p>")
    ,
    newTextInput("NativeLang")
        .inputWarning("We would like you to type some text in these fields")
        .print()
    ,    
    newText("<p>Do you speak any other languages?</p>")
    ,
    newTextInput("OtherLangs")
        .inputWarning("We would like you to type some text in these fields")
        .print()
    ,
    newButton("Start")
        .center()
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
    ,
    newVar("NativeLang")
        .global()
        .set( getTextInput("NativeLang") )
    ,
    newVar("OtherLangs")
        .global()
        .set( getTextInput("NativeLang") )
)
.log( "ID" , getVar("ID") )
.log( "NativeLang" , getVar("NativeLang") )
.log( "OtherLangs" , getVar("OtherLangs") )


newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("<p>In this experiment, we will ask you to decide whether you agree or disagree with a statement.</p>")
    ,
    newButton("Let's practice!")
        .center()
        .print()
        .wait()
)


newTrial( "trainT",
        newTimer(500)
            .start()
            .wait()
        ,
        newText("<p>First you will see a sentence like:</p>")
            .center()
            .print()
        ,
        newText( "<p>Houses can be made of wood.</p>" )
            .center()
            .print()
        ,
        newText("<p> If you <strong>Agree</strong> with the sentence, press <strong>F</strong>. If you <strong>Disagree</strong>, then press <strong>J</strong><p>")
            .center()
            .print()
        ,
        newSelector()
            .add( newText("Agree"), newText("Disagree"))
            .center()
            .keys("F", "J")
            .log()
            .wait()
        ,
        newTimer(500)
            .start()
            .wait()
)

newTrial( "trainF",
        newTimer(500)
            .start()
            .wait()
        ,
        newText("<p>First you will see a sentence like:</p>")
            .center()
            .print()
        ,
        newText( "<p>Airplanes fly under water.</p>" )
            .center()
            .print()
        ,
        newText("<p> If you <strong>Agree</strong> with the sentence, press <strong>F</strong>. If you <strong>Disagree</strong>, then press <strong>J</strong><p>")
            .center()
            .print()
        ,
        newSelector()
            .add( newText("Agree"), newText("Disagree"))
            .center()
            .keys("F", "J")
            .log()
            .wait()
        ,
        newTimer(500)
            .start()
            .wait()
)


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
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )


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


