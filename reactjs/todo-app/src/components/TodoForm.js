import React, {useState} from "react";
import {Button, Form, FormLayout, Modal, Stack, TextField} from "@shopify/polaris";

function TodoForm({ addTodo }) {
    const [active, setActive] = useState(false);
    const [value, setValue] = useState("");

    const toggleModal = () => setActive((active) => !active);
    const activator = <Button primary onClick={toggleModal}>Created todo</Button>;

    const handleSubmit = () => {
        if (!value) return;
        addTodo(value);
        setValue("");
    };
    const handleUrlChange = (value) => setValue(value);

    return (
        <>
            <Modal
                activator={activator}
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