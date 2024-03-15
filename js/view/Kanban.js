import Column from "./Column.js";

//this is gonna be an entry point for the application
export default class Kanban{
    constructor(root){
        this.root = root;  
        Kanban.columns().forEach(column =>{
            //here we are calling the column class inside the Kanban class
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root)
        });
    }

    //contains the layout of every singlc column
    static columns(){
        return[
            {
                id:1,
                title:"Not Started"
            },
            {
                id:2,
                title:"In Progress"
            },
            {
                id:3,
                title:"Completed"
            }
        ]
    }
}