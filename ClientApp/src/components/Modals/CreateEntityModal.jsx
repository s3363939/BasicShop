import React, { Component } from 'react';
import { Icon, Button, Modal, Form } from 'semantic-ui-react';
import $ from 'jquery';

export class CreateEntityModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            entityName: this.props.entityName,
            field1: this.props.field1,
            field2: this.props.field2,
            value1: '',
            value2: ''
        };

        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    CreateEntity() {

        const myEntity = {
            [this.state.field1]: this.state.value1,
            [this.state.field2]: this.state.value2
        };
        var self = this;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: myEntity,
            url: 'api/' + this.state.entityName + '/Add' + this.state.entityName,
            success: function () {
                self.props.refresh();
            }
        });

        this.setState({ value1: '' })
        this.setState({ value2: '' })
        this.props.refresh();
    }

    handleCreateButton = () => {
        this.CreateEntity();
        this.closeModal();
    }

    handleInputChange1(event) {
        this.setState({ value1: event.target.value })
    }

    handleInputChange2(event) {
        this.setState({ value2: event.target.value })
    }

    render() {
        const {
            showModal,
            entityName,
            field1,
            field2
        } = this.state

        const inlineStyle = {
            modal: {
                marginTop: 'auto !important',
                position: 'relative'
            }
        };
        return (
            <Modal
                size='tiny' style={inlineStyle.modal}
                open={showModal}
                trigger={
                    <Button
                        onClick={() => this.setState({ showModal: true })}
                        color='blue'>
                        New {entityName}
                    </Button>}
                >
                <Modal.Header>New {entityName}</Modal.Header>
                <Modal.Content >
                    <Form>
                        <Form.Input label={field1} value={this.state.value1} onChange={this.handleInputChange1} />
                        <Form.Input label={field2} value={this.state.value2} onChange={this.handleInputChange2} />
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button onClick={this.handleCreateButton} color='green'>
                            <Button.Content visible>
                                Create
                                <Icon name='check' />
                            </Button.Content>
                        </Button>
                    </Form>                        
                </Modal.Content>
            </Modal>
        );
    }
}
