import config from './config.js';

const taskList = document.querySelector( '.task-list ul' );
const loader = document.querySelector( '.loader' );
const more = document.querySelector( '.more' );

let pageCount = 1;

function getDate( task ) {
    let date;
    let options = {
        weekday:    "long",
        year:       "numeric",
        month:      "short",
        day:        "numeric",
        hour:       "2-digit",
        minute:     "2-digit",
        timeZone:   "Sweden/Stockholm"
    };

    if ( !task.modified ) {
        let taskDate = new Date(task.date);
        date = 'TODO created <time datetime="' + task.date + '">' + taskDate.toLocaleDateString("sv-SE", options) + '</time>';
    } else {
        let taskModified = new Date(task.modified);
        date = 'TODO updated <time datetime="' + task.modified + '">' + taskModified.toLocaleDateString("sv-SE", options) + '</time>';
    }

    return date;
}

/**
 * Load more TODOs when browser is scrolled to the more button.
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
function morePostsTrigger(){
  const observer = new IntersectionObserver( function (entries, self) {
      entries.forEach( entry=>{
          if ( entry.isIntersecting ) {
              self.disconnect();
              pageCount++;
              getTaskList( `${config.taskRoute}?page=${pageCount}` );
              
          }
      });
  });
  observer.observe( document.querySelector( '.more' ) );
}

function createTaskList() {
    if ( taskObjectList.code != undefined ) {
        console.info( `No more TODOs loaded because ${taskObjectList.code}.`);
        
    } else {
        taskObjectList.forEach(taskObject => {
            let completed = taskObject.task_status === 'Completed' ? 'class="completed' : '';
            let navListItem = document.createElement( 'li' );
            navListItem.innerHTML = `
                <a href="single.html?task=${taskObject.id}" ${completed}>
                    <h2 class="task-title">${taskObject.title.rendered}</h2>
                    <div class="task-date">${getDate(taskObject)}</div>
                    <div class=task-status">${taskObject.task_status}</div>
                </a>`;
            taskList.append(navListItem);
        });
        more.style.display = 'block';
        morePostsTrigger();
    }
    loader.style.display = 'none';
}

const getTaskList = ( listRoute ) => {

    more.style.display = 'none';
    loader.style.display = 'block';
}

export default getTaskList;