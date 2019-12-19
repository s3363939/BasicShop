import React, { Component } from 'react';
import { Icon, Button, Modal, Divider, Form } from 'semantic-ui-react';
import $ from 'jquery';

export class EditEntityModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            entityName: this.props.entityName,
            entity: this.props.entity,
            field1: this.props.field1,
            field2: this.props.field2,
            value1: this.props.value1,
            value2: this.props.value2
        };

        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    EditEntity() {

        const myEntity = {
            Id: this.state.entity.id,
            [this.state.field1]: this.state.value1,
            [this.state.field2]: this.state.value2
        };

        $.ajax({
            type: 'PUT',
            dataType: 'json',
            data: myEntity,
            url: 'api/' + this.state.entityName + '/Update' + this.state.entityName
        });
    }

    handleEditButton = () => {
        this.EditEntity();
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
                        color='yellow'>
                        <Button.Content visible>
                            <Icon name='edit' />
                            Edit
                        </Button.Content>    
                    </Button>} >
                <Modal.Header>Edit {entityName}</Modal.Header>
                <Modal.Content >
                    <Form.Input label={field1} value={this.state.value1} onChange={this.handleInputChange1} />
                    <br />
                    <Form.Input label={field2} value={this.state.value2} onChange={this.handleInputChange2} />
                    <Divider />
                    <Button onClick={this.closeModal}>Cancel</Button>
                    <Button onClick={this.handleEditButton} color='green'>
                        <Button.Content visible>
                            Edit
                            <Icon name='check' />
                        </Button.Content>
                    </Button>
                </Modal.Content>
            </Modal>
        );
    }
}
