const Project = function(project_id,projects,task_id,tasks){
    this.project_id = project_id;
    this.task_id = task_id;
    this.projects = projects;
    this.tasks = tasks;

    /*this.check = function () {
        if(localStorage.getItem('project') == null){
            localStorage.setItem('project','[]')
        }else{
            this.buildProject();
        }

    };*/
    /*
    $.ajax({
        url: '/projects',
        success: function(data) {
            projects = data.data;
        },
        error: function (r) {
            console.log(r)
        }
    });*/
    this.addProject = function (projects,tasks) {
        let projectName = $('#projectName').val();
        $.ajax({
            url: '/projects/' + projectName,
            success: function(data) {
                project.buildProject();
            },
            error: function (r) {
                console.log(r)
            }
        });
    };

    this.buildProject = function () {
        $.ajax({
            url: '/projects',
            success: function(data) {
                projects = data.data;
                let building = document.getElementById('building');
                let content = '';
                for (let i = 0; i < projects.length; i++) {
                    content += '<button class="btn-project" id="' + projects[i].id + '">' + projects[i].name + '</button>';
                }
                building.innerHTML = content;
                project.createEvent();
            },
            error: function (r) {
                console.log(r)
            }
        });

    };

    this.createEvent = function () {
        let btn = document.getElementsByClassName('btn-project');
        for(let i=0;i<btn.length;i++){
            btn[i].addEventListener("click",function () {
                project_id = btn[i].id;
                project.buildTask(project_id);
            });
        }
    };

    this.addTask = function () {
        let taskName = $('#taskName').val();
        $.ajax({
            url: '/task/' + taskName + '/id/' + project_id,
            success: function(data) {

                project.buildTask(project_id);
            },
            error: function (r) {
                console.log(r)
            }
        });
    };

    this.buildTask = function (project_id) {
        $.ajax({
            url: '/tasks/' + project_id,
            success: function(data) {
                tasks = data.data;
                let taskContainer = document.getElementById('taskContainer');
                let content = '';
                for (let j = 0; j < tasks.length; j++) {
                    content +=  '<div class="tasks" id="'+ tasks[j].id +'">\n' +
                        '                <h3>'+ tasks[j].name +'</h3>\n' +
                        '                <button class="btn btn-dark btn-task" data-toggle="modal" data-target="#editTask" id="'+ tasks[j].id +'">edit</button>\n' +
                        '                <button class="btn btn-dark btn-task" data-toggle="modal" data-target="#deleteTask" id="'+ tasks[j].id +'">delete</button>\n' +
                        '        </div>';
                }
                taskContainer.innerHTML = content;
                project.eventTask();
            },
            error: function (r) {
                console.log(r)
            }
        });


    };

    this.eventTask = function () {
        let btn = document.getElementsByClassName('btn-task');
        for(let i=0;i<btn.length;i++){
            btn[i].addEventListener("click",function () {
                task_id = btn[i].id;
            });
        }
    };

    this.editTask = function () {
        let newTaskName = $('#newTaskName').val();
        $.ajax({
            url: '/task/' + newTaskName + '/taskid/' + task_id ,
            success: function(data) {
                project.buildTask(project_id);
            },
            error: function (r) {
                console.log(r)
            }
        });
        project.buildTask(project_id);
    };

    this.deleteTask = function () {
        $.ajax({
            url: '/taskid/' + task_id ,
            success: function(data) {
                project.buildTask(project_id);
            },
            error: function (r) {
                console.log(r)
            }
        });
        project.buildTask(project_id);
    };
};

$('.editTask').click(function() {
    let id = this.id;
    $('#newTaskId').val(id);
});

const project = new Project();

project.buildProject();
