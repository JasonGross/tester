(* comment for better indentation *)
style numRoundsLeft

fun main () =
    numberOfRoundsLeft <- source 0;
    response <- source "";
    return <xml>
      <head>
	<link rel="stylesheet" type="text/css" href="css/tester.css"/>
	<title>Vocabulary Tester v{[Version.version]}</title>
      </head>
      <body>
	<div> (* class="results"*)
	  <p>
	    If you answer all the questions correctly in this round, you will have
	    <span class={numRoundsLeft}>
	      <dyn signal={n <- signal numberOfRoundsLeft; return <xml>{[n]}</xml>} />
										    </span>
										    rounds left to do.
	    </p>
	  </div>
	</body>
      </xml>
