PennController.ResetPrefix(null); // Initiates PennController

// BOTT & NOVECK TRIALS

Sequence("intro","consent", "demo","instructions", "trainT", "trainF","train_thinkT","train_thinkF", "end_train", rshuffle("trial"), "send", "final")

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


// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ID")
        .global()
    // ,
    // // Delay of 250ms before every trial
    // newTimer(250)
    //     .start()
    //     .wait()
)
.log( "ID" , getVar("ID") )
// This log command adds a column reporting the participant's name to every line saved to the results


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
        newText("<p><strong>PRACTICE.</strong></p>")
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
        newText("<p>Since this statement is <strong>correct</strong>, you should press <strong>F</strong> on the keyboard to agree.<p>")
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
        newText("<p><strong>PRACTICE.</strong></p>")
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
        newText("<p>Since this statement is <strong>incorrect</strong>, you should press <strong>J</strong> on the keyboard to disagree.<p>")
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

newTrial( "train_thinkT",
        newTimer(500)
            .start()
            .wait()
        ,
        newText("<p><strong>PRACTICE.</strong></p>")
            .center()
            .print()
        ,
        newText( "<p>Historians think that George Washington was a US president.</p>" )
            .center()
            .print()
        ,
        newText("<p> If you <strong>Agree</strong> with the sentence, press <strong>F</strong>. If you <strong>Disagree</strong>, then press <strong>J</strong><p>")
            .center()
            .print()
        ,
        newText("<p>Since this statement is <strong>correct</strong>, you should press <strong>F</strong> on the keyboard to agree.<p>")
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

newTrial( "train_thinkF",
        newTimer(500)
            .start()
            .wait()
        ,
        newText("<p><strong>PRACTICE.</strong></p>")
            .center()
            .print()
        ,
        newText( "<p>Geographers think that Spain is in Africa.</p>" )
            .center()
            .print()
        ,
        newText("<p> If you <strong>Agree</strong> with the sentence, press <strong>F</strong>. If you <strong>Disagree</strong>, then press <strong>J</strong><p>")
            .center()
            .print()
        ,
        newText("<p>Since this statement is <strong>incorrect</strong>, you should press <strong>J</strong> on the keyboard to disagree.<p>")
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


Template( "bn_table.csv", row =>
    newTrial( "trial",
        newTimer(500)
            .start()
            .wait()
        ,
        newText("sentence", `${row.Matrix} ${row.Quantifier} ${row[row.Subject.replace("Category",row.WhichCategory+'Category')]} are ${row[row.Predicate.replace("Category",row.WhichCategory+'Category')]}` )
            .center()
            .print()
        ,
        newText("<p> Press <strong>F</strong> to <strong>Agree</strong> or <strong>J</strong> to <strong>Disagree</strong><p>")
            .center()
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


