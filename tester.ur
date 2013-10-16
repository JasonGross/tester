(* this comment is for better indentation *)
style actualProgressBar
style actualProgressBarHolder
style cell
style correctProgressBar
style correctRow
style incorrectProgressBar
style incorrectRow
style numRoundsLeft
style overlayProgressBarHolder
style testerCell
style testHolder
style ui_corner_all
style ui_corner_left
style ui_progressbar
style ui_progressbar_value
style ui_widget
style ui_widget_content
style ui_widget_header

(* val x : int = @@show *)

(* get this from list.ur *)
fun foldl [a] [b] (f : a -> b -> b) (acc : b) (ls : list a) : b =
    case ls of
      | nil => acc
      | x :: ls' => foldl f (f x acc) ls'

fun showToXml [a] (_ : show a) (value : source a) : signal xbody =
    v <- signal value;
    return <xml>{[v]}</xml>

type unansweredQuestion = {Prompt : string,
			   ExpectedResponse : string}

type answeredQuestion = unansweredQuestion ++
			{ActualResponse : string,
			 ResponseCorrect : bool}



fun makeAnsweredQuestionRow (question : answeredQuestion) : xbody =
    (if question.ResponseCorrect then
	 <xml>
	   <div class={correctRow}>
	     <div class={foldl classes null (cell :: testerCell :: [])}>{[question.Prompt]}</div>
	     <div class={foldl classes null (cell :: testerCell :: [])}>{[question.ExpectedResponse]}</div>
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

fun makeAnsweredQuestionsProgressBar (questions : list answeredQuestion) (totalQuestions : int) : xbody =
    let
	val correctQuestions = foldl (fn question n => n + if question.ResponseCorrect then 1 else 0) 0 questions
	val incorrectQuestions = foldl (fn question n => n + if question.ResponseCorrect then 0 else 1) 0 questions
    in
	<xml>
	  <div>
	    <div class={actualProgressBarHolder}>
	      <div class={foldl classes null (actualProgressBar :: ui_progressbar :: ui_widget :: ui_widget_content :: ui_corner_all :: [])} (*role="progressbar" aria_valuemin="0" aria_valuemax="100" aria_valuenow="66.66666666666667"*)>
		<div class={foldl classes null (ui_progressbar_value :: ui_widget_header :: ui_corner_left :: [])} style="display: block; width: 67%;">
		</div>
	      </div>
	    </div>
	    <div class={foldl classes null (overlayProgressBarHolder :: ui_widget :: ui_progressbar :: ui_widget_content :: ui_corner_all :: [])} style="height: 35px;">
	      <div class={foldl classes null (correctProgressBar :: ui_corner_left :: ui_progressbar :: [])} style="height: 35px; width: 33.5%;">
	      </div>
	      <div class={foldl classes null (incorrectProgressBar :: ui_progressbar :: [])} style="height: 35px; width: 33.5%;">
	      </div>
	    </div>
	  </div>
	</xml>
    end

fun makeRound (numberOfRoundsLeft : int)
	      (answeredQuestions : list answeredQuestion)
	      (unans


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
	(*{makeAnsweredQuestionsProgressBar*)
      </body>
    </xml>
