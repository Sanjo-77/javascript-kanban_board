import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column{
    constructor(id,title){
        const topDropZone = DropZone.createDropZone()
        this.elements={}; //we will store all the HTML in this object
        this.elements.root=Column.createRoot();

        //we will work on this
        this.elements.title=this.elements.root.querySelector(".kanban__column-title");
        //this will be used in renderItem method
        this.elements.items=this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem=this.elements.root.querySelector(".kanban__add-item");

        this.elements.root.dataset.id=id; //dataset.id is used to enter custom data markup
        this.elements.title.textContent = title; //textContent refers to text in that element
        
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click",()=>{
            const newItem =KanbanAPI.insertItem(id,"")
            this.renderItem(newItem);
        })

        KanbanAPI.getItems(id).forEach(item=>{
            this.renderItem(item)
        })

        
    }


    //this insert html of column into the document
    static createRoot(){
        //these are the technique to insert html in the page
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
        <div class="kanban__column">
            <div class="kanban__column-title"></div>
            <div class="kanban__column-items"></div>
            <button class="kanban__add-item" type="button">+ Add</button>
        </div>
        `).children[0]
    }

    renderItem(data){
        const item = new Item(data.id,data.content);
        this.elements.items.appendChild(item.elements.root);

    }
}



