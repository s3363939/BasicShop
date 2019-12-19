import React, { Component } from 'react';
import { Icon, Button, Modal, Divider } from 'semantic-ui-react';
import $ from 'jquery';

export class DeleteSaleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            sale: this.props.entity
        };
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    DeleteEntity() {

        const myEntityId = this.state.sale.id;

        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: 'api/Sale/DeleteSale?id=' + myEntityId
        });
    }

    handleDeleteButton() {
        this.DeleteEntity();
        this.closeModal();
    }

    render() {
        const {
            showModal
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
                <Modal.Header>Delete Sale</Modal.Header>
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
