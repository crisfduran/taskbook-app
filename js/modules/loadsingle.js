import monitorFormSubmit from './edittask.js';
const loader = document.querySelector( '.loader' );

function getDate( task ) {
    const options = {
        weekday:    "long",
        year:       "numeric",
        month:      "short",
        day:        "numeric",
        hour:       "2-digit",
        minute:     "2-digit",
        timeZone:   "Sweden/Stockholm"
    };

    let taskDate = new Date(task.date);
    let date = `<div class="task-date">TODO created <time>${taskDate.toLocaleDateString("sv-SE", options)}</time></div>`;
    
    var modifiedDate = new Date(task.modified);
    let modified = '';

    if ( task.date != task.modified ) {
        modified = `<div class="task-date">TODO updated <time>${modifiedDate.toLocaleDateString("sv-SE", options)}</time></div>`;
    }
    return date + modified;
}

function getLevel( taskLevel ) {
    switch ( taskLevel ) {
        case '1':
            return 'Väldigt stressad';
            break;
        case '2':
            return 'Ganska stressad';
            break;
        case '3':
            return 'Neutral';
            break;
        case '4':
            return 'Ganska avslappnad';
            break;
        case '5':
            return 'Väldigt avslappnad';
            break;
    }
}

function getOutcome( taskObject ) {

    let taskStatus = taskObject.task_status;
    console.log('getOutcome taskStatus: ', taskStatus);
    let outcome;
    
    if ( taskStatus === 'Completed' ) {
        outcome = `
        <div class="task-outcome">
        <h3 class="task-sub">Task Outcome</h3>
        <div class="task-block">
            ${taskObject.cmb2.taskbook_rest_metabox.taskbook_outcome}
        </div>
        <h3 class="task-sub">Post-task stress level</h3>
        <div class="task-pre-level level">
            ${getLevel( taskObject.cmb2.taskbook_rest_metabox.taskbook_post_level )}
        </div>
    </div>`;
        
    } else {
        outcome = `
        <form id="task-form" method="POST">
            <label for="outcome">
                <span class="label">Resultat</span>
                <div class="field-description">Vad hände?</div>
            </label>
            <textarea name="outcome" rows="10" cols="50" minlength="20" required></textarea>
            <fieldset class="stress-level">
                <legend class="label">Faktisk stressnivå</legend>
                <label for="1">
                    <input type="radio" name="post-level" value="1" id="1" required>
                    <span>Väldigt stressad</span>
                </label>
                <label for="2">
                    <input type="radio" name="post-level" value="2" id="2" required>
                    <span>Ganska stressad</span>
                </label>
                <label for="3">
                    <input type="radio" name="post-level" value="3" id="3" required>
                    <span>Neutral</span>
                </label>
                <label for="4">
                    <input type="radio" name="post-level" value="4" id="4" required>
                    <span>Ganska avslappnad</span>
                </label>
                <label for="5">
                    <input type="radio" name="post-level" value="5" id="5" required>
                    <span>Väldigt avslappnad</span>
                </label>
            </fieldset>
            <input type="submit" value="Update task">
        </form>`;
    }
    return outcome;
    
}

function buildTask( taskObject ) {
    console.log(taskObject);

    let taskArticle = document.createElement( 'article' );
    taskArticle.classList.add( 'task' );

    taskArticle.innerHTML = `
        <h2 class="task-title">${taskObject.title.rendered}</h2>
            <div class="task-meta">
                ${getDate(taskObject)}
            </div>
            <div class="task-description task-block">
                ${taskObject.content.rendered}
            </div>
            <div class="task-prediction">
                <h3 class="task-sub">TODO Förväntan</h3>
                <div class="task-block">
                    ${taskObject.cmb2.taskbook_rest_metabox.taskbook_prediction}
                </div>
                <h3 class="task-sub">Stressnivå innan TODO</h3>
                <div class="task-pre-level level">
                    ${getLevel( taskObject.cmb2.taskbook_rest_metabox.taskbook_pre_level )}
                </div>
            </div><!-- .task-prediction -->
            ${getOutcome( taskObject )}`;

    let main = document.querySelector( '.single-task' );
    main.append( taskArticle );

    return taskObject;
}

const getSingleTask = (taskRoute, newTask ) => {
    if ( newTask ) {
        monitorFormSubmit( newTask );
    } else {
        loader.style.display = 'block';
    }
}

export default getSingleTask;