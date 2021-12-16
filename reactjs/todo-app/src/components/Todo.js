import React, {useState} from "react";
import {Card, ResourceItem, ResourceList, TextStyle} from "@shopify/polaris";

function Todo({todo, multiRequest, completeTodo, removeTodo}) {
    const [selectedItems, setSelectedItems] = useState([]);

    const multiCompleteTodo = () => {
        multiRequest({method: "PUT", arrIds: selectedItems});
        setSelectedItems([]);
    }

    const multiRemoveTodo = () => {
        multiRequest({method: "DELETE", arrIds: selectedItems});
        setSelectedItems([]);
    };

    const promotedBulkActions = [
        {content: 'Complete', onAction: multiCompleteTodo},
        {content: 'Delete', onAction: multiRemoveTodo}
    ];

    return (
        <Card>
            <ResourceList
                items={todo}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                promotedBulkActions={promotedBulkActions}
            />
        </Card>
    );

    function renderItem(todo) {
        return (
            <ResourceItem
                id={todo.id}
            >
                <div className="todo">
                    <div className="todo-label">
                        <TextStyle variation="strong">{todo.todo}</TextStyle>
                    </div>
                    <div className="todo-action">
                        {todo.isCompleted ?
                            (<p className="todo-status">Complete</p>) :
                            (<>
                                <p className="todo-status">Pending</p>
                                <button className="todo-complete" onClick={() => completeTodo(todo)}>Complete</button>
                            </>)
                        }
                        <button className="todo-remove" onClick={() => removeTodo(todo)}>x</button>
                    </div>
                </div>
            </ResourceItem>
        );
    }
}

export default Todo;