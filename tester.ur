fun main () =
return <xml>
  <head>
    <title>Vocabulary Tester v{[Version.version]}</title>
  </head>
  <body>
    <div class="only-when-cached">
      <div class="results">
        <p>If you answer all the questions correctly in this round, you will have <span id="num-rounds-left">0</span> rounds left to do.</p>
      </div>
      <form>
        <div id="test-holder" style="display:table">
          <label id="test" style="display:table-row">
            <span class="prompt">
              <span id="test-num">1</span> of <span id="test-count">0</span>:&nbsp;
              <span id="prompt"></span>&nbsp;&nbsp;&nbsp;
            </span>
            <span class="response"><input type="text" name="response" id="response" autofocus="autofocus" autocomplete="off" style="width:100%"/></span>
          </label>
        </div>
        <br/>
          <button type="submit" id="submit-response">Next Question</button>
	</form>
	<div class="results" id="results">
          <div class="progress" id="progress">
            <div class="progress-bar-holder">
              <div class="actual-progress-bar-holder">
		<div class="actual-progress-bar"></div>
              </div>
              <div class="overlay-progress-bar-holder ui-widget ui-progressbar ui-widget-content ui-corner-all">
		<div class="correct-progress-bar ui-corner-left ui-progressbar"></div>
		<div class="incorrect-progress-bar ui-progressbar"></div>
              </div>
            </div>
            <div class="progress-message" id="progress_message">
              Out of the first <span id="progress-message-num-done">0</span> questions in this round: <br>
		Number Right: <span id="progress-message-num-correct">0</span> <br>
		  Number Wrong: <span id="progress-message-num-incorrect">0</span>
		</div>
              </div>
              <script type="text/javascript">
		progress = new Progress(0,
                '.progress', '.progress-message', '.progress-bar-holder',
                '.actual-progress-bar', '.overlay-progress-bar-holder',
                '.correct-progress-bar', '.incorrect-progress-bar',
                '#progress-message-num-correct',
                '#progress-message-num-incorrect',
                '#progress-message-num-done');
              </script>
	    </div>
	    <hr>
	      <div>
		<form action="list-editor.shtml" method="get">
		  <input type="hidden" name="testList" id="testList">
		    <input type="submit" value="Edit word list" id="edit-word-list-button">
		    </form>
		  </div>
		  <hr>
		    <div id="options">
		      <fieldset style="display: inline-block; vertical-align: top">
			<legend>Which past tests should be shown?</legend>
			<label><input type="radio" name="show-tests" id="show-tests" class="show-tests" value="round" checked="checked">All the ones from this round.</label><br>
			  <label><input type="radio" name="show-tests" id="show-tests" class="show-tests" value="all">All of them.</label><br>
			    <label><input type="radio" name="show-tests" id="show-tests" class="show-tests" value="one">Only the most recent one.</label><br>
			      <label><input type="radio" name="show-tests" id="show-tests" class="show-tests" value="none">None of them.</label><br>
				<label><input type="radio" name="show-tests" id="show-tests-custom" class="show-tests" value="custom">
				  <input type="number" min="0" step="1" value="5" id="show-tests-number-input"
				  onchange="document.getElementById('show-tests-custom').checked = 'checked';"/> of them.</label>
				</fieldset>
				(*<!--#include virtual="html/comparator.html" -->*)
				</div>
			      </div>
			      </body>
			    </xml>

														    (*
														     fun main () =
															 (*    msg <- source <xml/>;*)
															 mousedown <- source None;
															 let fun onload () =
																 onMousedown(fn args => set mousedown (Some args.Button));
																 onMouseup(fn _ => set mousedown None)

															     fun mkDraggable (innerHTML) =
																 dragging <- source False;
																 (*	    clientX <- source 0;
																  clientY <- source 0;
																  offsetLeft <- source 0;
																  offsetTop <- source 0;*)

																 let (*fun dragstart (args) =
																	   set clientX args.ClientX;
																	   set clientY args.ClientY;
																	   set dragging True*)

																     fun dragstop (args) =
																	 (*isDragging <- get dragging;
																	  if isDragging then drag args else 0*)
																	 set dragging False
																 (*
																  fun drag (args) =
																      origX <- get clientX;
																      origY <- get clientY;
																      set offsetLeft (args.ClientX - origX);
																      set offsetTop (args.ClientY - origY)

																  fun mkCss () =
																      left <- signal offsetLeft;
																      top <- signal offsetTop;
																      return (oneProperty
																		  (oneProperty
																		       (STYLE "display: inline-block; position: relative")
																		       (property ("left: " ^ (show left) ^ "px")))
																		  (property ("top: " ^ (show top) ^ "px")))

																  fun handleMousedown (args) =
																      md <- get mousedown;
																      case md of
																	  Some Left => dragstart args*)
																 in
																     onMouseup(dragstop);
																     return <xml>
																       <div (*dynStyle={mkCss ()}
																			   onmousedown={handleMousedown}*)>
																       {[innerHTML]}
																       </div>
																       </xml>
																 end
															 in
															     return <xml>
															       <head>
															       <title>Hello world!</title>
															       </head>
															       <body onload={onload ()}>
<h1>Hello world!</h1>
{[mkDraggable <xml>
  <div style="width:200px; height:200px; position:relative; border:thick black solid">(*
										       onmousemove={fn args =>
												       md <- get mousedown;
												       set msg <xml>
													 ScreenX: {[args.ScreenX]}
													 ScreenY: {[args.ScreenY]}
													 ClientX: {[args.ClientX]}
													 ClientY: {[args.ClientY]}
													 Button: {[args.Button]}
													 Mousedown: {[md]}
												       </xml>}>*)
Drag Me!(* <dyn signal={signal msg}/>*)
</div>
</xml>]}
</body>
</xml>
															 end*)
