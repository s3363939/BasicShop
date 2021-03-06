﻿import React, { Component } from 'react';
import { Icon, Button, Modal, Divider } from 'semantic-ui-react';
import $ from 'jquery';

export class DeleteEntityModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            entityName: this.props.entityName,
            entityId: this.props.entityId
        };
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    DeleteEntity() {

        const myEntityId = this.state.entityId;
        var self = this;
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: 'api/' + this.state.entityName + '/Delete' + this.state.entityName + '?id=' + myEntityId,
            success: function () {
                self.props.refresh();
            }
        });
    }

    handleDeleteButton() {
        this.DeleteEntity();
        this.closeModal();        
    }

    render() {
        const {
            showModal,
            entityName
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
                        color='red'>
                        <Button.Content visible>
                            <Icon name='trash' />
                            Delete
                        </Button.Content>
                    </Button>}
            >
                <Modal.Header>Delete {entityName}</Modal.Header>
                <Modal.Content >
                    <p>Are you sure ?</p>
                    <Divider/>
                    <Button onClick={this.closeModal}>Cancel</Button>
                    <Button onClick={(evt) => this.handleDeleteButton()} color='green'>
                        <Button.Content visible color='red'>
                            Delete
                            <Icon name='delete' />
                        </Button.Content>
                    </Button>
                </Modal.Content>
            </Modal>
        );
    }
}
