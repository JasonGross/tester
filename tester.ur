(* this comment is for better indentation *)
style numRoundsLeft
style testHolder
style correctRow
style incorrectRow
style cell
style actualProgressBar

(* val x : int = @@show *)

fun showToXml [a] (_ : show a) (value : source a) : signal xbody =
    v <- signal value;
    return <xml>{[v]}</xml>

type answeredQuestion = {Prompt : string,
			 ExpectedResponse : string,
			 ActualResponse : string,
			 ResponseCorrect : bool}

fun makeAnsweredQuestionRow (question : answeredQuestion) : xbody =
    (if question.ResponseCorrect then
	 <xml>
	   <div class={correctRow}>
	     <div class={cell}>{[question.Prompt]}</div>
	     <div class={cell}>{[question.ExpectedResponse]}</div>
	   </div>
	 </xml>
     else
	 <xml>
	   <div class={incorrectRow}>
	     <div class={cell}>{[question.Prompt]}</div>
	     <div class={cell}>
	       {[question.ActualResponse]}<br />
	       Incorrect; The correct response was: {[question.ExpectedResponse]}
	     </div>
	   </div>
	 </xml>)

fun foldl [a] [b] (start : b) (f : b -> a -> b) (ls : list a) : b =
    case ls of
	[] => start
      | x :: ls' => foldl (f start x) f ls'

fun foldr [a] [b] (start : b) (f : b -> a -> b) (ls : list a) : b =
    case ls of
	[] => start
      | x :: ls' => f (foldr start f ls') x

fun makeAnsweredQuestionsProgressBar (questions : list answeredQuestion) (totalQuestions : int) : xbody =
    let
	val correctQuestions = foldl 0 (fn n question => n + if question.ResponseCorrect then 1 else 0) questions
	val incorrectQuestions = foldl 0 (fn n question => n + if question.ResponseCorrect then 0 else 1) questions
    in
	<xml>
	  <div>
	    <div class={actualProgressBar}>

	    </div>
	  </div>
	</xml>
    end


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
	      <dyn signal={showToXml numberOfRoundsLeft} />
	    </span>
	    rounds left to do.
	  </p>
	</div>
	<div class={testHolder}>
	  {makeAnsweredQuestionRow {Prompt = "foo", ExpectedResponse = "bar", ActualResponse = "baz", ResponseCorrect = True}}
	  {makeAnsweredQuestionRow {Prompt = "bar", ExpectedResponse = "baz", ActualResponse = "qux", ResponseCorrect = False}}
	</div>
      </body>
    </xml>
