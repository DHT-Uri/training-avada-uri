import React, {useState} from "react";
import {Button, Form, FormLayout, Modal, Stack, TextField} from "@shopify/polaris";

function TodoForm({addTodo , toggleModal, active}) {

    const [value, setValue] = useState("");

    const handleSubmit = () => {
        if (!value) return;
        addTodo(value);
        setValue("");
    };
    const handleUrlChange = (value) => setValue(value);

    return (
        <>
            <Modal
                open={active}
                onClose={toggleModal}
                title="Create a new todo"
                primaryAction={{
                    content: 'Create',
                    onAction: handleSubmit
                }}
                secondaryActions = {{
                    content: 'Close',
                    onAction: toggleModal
                }}
            >
                <Modal.Section>
                    <Stack vertical>
                        <Stack.Item fill>
                            <Form noValidate onSubmit={handleSubmit}>
                                <FormLayout>
                                    <TextField
                                        value={value}
                                        onChange={handleUrlChange}
                                        type="text"
                                        label=""
                                        autoComplete="off"
                                        placeholder="Your todo..."
                                        required="true"
                                    />
                                </FormLayout>
                            </Form>
                        </Stack.Item>
                    </Stack>
                </Modal.Section>
            </Modal>
        </>
    );
}

export default TodoForm;