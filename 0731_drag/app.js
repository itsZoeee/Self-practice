// const dragArea = document.querySelector(".wrapper");
// new Sortable(dragArea,{
//     animation:350
// });

const draggables = document.querySelectorAll(".item");
const container = document.querySelector(".wrapper");

draggables.forEach(eachDraggable =>{
    /*開始drag時，原item會刷淡*/
    eachDraggable.addEventListener('dragstart',()=>{
        eachDraggable.classList.add('dragging');
    })

    /*沒drag之後，原item恢復原色彩*/
    eachDraggable.addEventListener('dragend',()=>{
        eachDraggable.classList.remove('dragging');
    })
})

container.addEventListener('dragover', e=>{
    e.preventDefault();
    // 目前選定的元素
    const currentSelected = document.querySelector('.dragging');
    // 最接近的次元素
    const afterElement = getDragAfterElement(container, e.clientY);
    // console.log(afterElement);

    if(afterElement == null){ /*若最接近的次元素為空時，代表已經到容器的最後了，所以直接置於最後*/
        container.append(currentSelected);
    }else{
        container.insertBefore(currentSelected, afterElement);
    }

})

function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')]; /*每一個draggable但非目前被選中的元素*/
    //console.log('draggableElements >>>', draggableElements); /* Array(4) [div.item, div.item, div.item, div.item]*/

    return draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect();
        // console.log('box >>>',box); /* DOMRect {x: 45, y: 45, width: 34, height: 78.4000015258789, top: 45, …} */
        const offset = y - box.top - box.height /2;
        if(offset < 0 && offset > closest.offset){
            return {offset:offset, element:child}
        }else{
            return closest;
        }
        
    },{offset:Number.NEGATIVE_INFINITY}).element;
}
