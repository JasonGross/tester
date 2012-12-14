(* comment for better indentation *)
style numRoundsLeft
style testHolder

fun main () =
    numberOfRoundsLeft <- source 0;
    response <- source "";
    let
	fun mkNumerOfRoundsLeft () =
	    n <- signal numberOfRoundsLeft;
	    return <xml>{[n]}</xml>
    in
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
		  <dyn signal={mkNumerOfRoundsLeft ()} />
		</span>
		rounds left to do.
	      </p>
	    </div>
	    <div class={testHolder}>

	    </div>
	  </body>
	</xml>
    end
