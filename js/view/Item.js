import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
export default class Item{
    constructor(id,content){
        const bottomdropZone = DropZone.createDropZone()
        this.elements ={}
        this.elements.root=Item.createRoot()
        this.elements.root.appendChild(bottomdropZone)
        this.elements.input=this.elements.root.querySelector(".kanban__item-input")

        this.elements.root.dataset.id=id;
        this.elements.input.textContent=content;
        //work on this later
        this.content = content

        const onBlur = () =>{
            const newContent = this.elements.input.textContent.trim();
            console.log(this.content)
            console.log(newContent)
            if(newContent==this.content){
                return;
            }
            this.content = newContent;
            KanbanAPI.updateItem(id,{
                content: this.content
            })

        };

        this.elements.input.addEventListener("blur",onBlur);

        this.elements.root.addEventListener("dblclick",()=>{
            const check = confirm("Are you sure you want to delete this?")
            if(check){
                KanbanAPI.deleteItem(id)
                this.elements.input.removeEventListener("blur",onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        })

        this.elements.root.addEventListener("dragstart",e => {
            e.dataTransfer.setData("text/plain",id)             
        })
        this.elements.input.addEventListener("drop", e=>{
            e.preventDefault();
        })

     }

    static createRoot(){
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
        
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable></div>
            </div>
            
        
        `).children[0]
    }
}