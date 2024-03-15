export default class KanbanAPI{
    //all the API function wil be defined here

    //this will read data from any of three columns
    static getItems(columnId){
        const columns = read()
        const column = columns.find(column=> column.id == columnId)
        if(!column){
            return[]
        }
        return column.items;
    }

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };

        if (!column) {
            throw new Error("Column does not exist.");
        }
        column.items.push(item)
        save(data);
        return item;
        //Note: Learn about pass-by-reference concept in js
    }

    //this function will move the item from the current column to a new column and update its value
     static updateItem(itemId,newProps){
        const data = read();
        //trying to fetch the item and current-column that the item is present
         const [item,currentColumn]=(()=>{
            for(const column of data){
                const item = column.items.find(item => item.id == itemId)

                if(item){
                    return[item,column] //here it goes to the array defined above
                }
            }
         })(); //created and called an arrow function for array destructuring

         if(!item){
            throw new Error("Item not found")
         }

         //updating the item content
         item.content = newProps.content === undefined ? item.content : newProps.content;

         if(newProps.columnId!==undefined
            &&
            newProps.position!==undefined
            ){
                const targetColumn = data.find(column => column.id == newProps.columnId);

                if(!targetColumn){
                    throw new Error("Target column not found")
                };

                //Delete the item from current column
                currentColumn.items.splice(currentColumn.items.indexOf(item),1);

                //move item into new column and position
                targetColumn.items.splice(newProps.position,0,item)

            }

            save(data);


    }

    static deleteItem(itemId){
        const data = read()
        for(const column of data){
            const item = column.items.find(item => item.id==itemId)
            if(item){
                column.items.splice(column.items.indexOf(item),1)
            }
        }
        save(data);
    }


}


//the read helper function
function read(){
    const json = localStorage.getItem("kanban-data"); //here we are fetching a json array
    //if json array is not found, return an empty javascript object
    if(!json){
        return[
            {
                id :1,
                items:[]
            },
            {
                id :2,
                items:[]
            },
            {
                id :3,
                items:[]
            }
        ]
    }
    //json converted into javascript object
    return JSON.parse(json)
}

//the save helper function
function save(data){
    localStorage.setItem("kanban-data",JSON.stringify(data));

}