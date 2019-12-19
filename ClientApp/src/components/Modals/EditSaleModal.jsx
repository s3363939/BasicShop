import React, { Component } from 'react';
import { Icon, Button, Modal, Divider, Form, Dropdown } from 'semantic-ui-react';
import $ from 'jquery';
import { DateInput } from 'semantic-ui-calendar-react';

export class EditSaleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            customers: [],
            products: [],
            stores: [],
            sale: this.props.entity,
            dateSold: this.props.entity.dateSold,
            productId: this.props.entity.productId,
            customerId: this.props.entity.customerId,
            storeId: this.props.entity.storeId
        };

        this.handleCustomerDDChange = this.handleCustomerDDChange.bind(this);
        this.handleProductDDChange = this.handleProductDDChange.bind(this);
        this.handleStoreDDChange = this.handleStoreDDChange.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        fetch('api/Customer/GetAllCustomers')
            .then(response => response.json())
            .then(data => this.setState({ customers: data }));

        fetch('api/Product/GetAllProducts')
            .then(response => response.json())
            .then(data => this.setState({ products: data }));

        fetch('api/Store/GetAllStores')
            .then(response => response.json())
            .then(data => this.setState({ stores: data }));
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    EditEntity() {

        const myEntity = {
            Id: this.state.sale.id,
            DateSold: this.state.dateSold,
            ProductId: this.state.productId,
            CustomerId: this.state.customerId,
            StoreId: this.state.storeId
        };
        console.log("sale EDIT", myEntity);
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            data: myEntity,
            url: 'api/Sale/UpdateSale'
        });
    }

    handleEditButton() {
        this.EditEntity();
        this.closeModal();
    }

    handleCustomerDDChange = (e, data) => {
        this.setState({ customerId: data.value });
    }

    handleProductDDChange = (e, data) => {
        this.setState({ productId: data.value });
    }

    handleStoreDDChange = (e, data) => {
        this.setState({ storeId: data.value });
    }

    setDate = (event, { name, value }) => {
        this.setState({ dateSold: value });
    }

    render() {
        const {
            showModal,
            customers,
            products,
            stores,
            sale
        } = this.state

        const customerOptions = customers.map((customer) => { return { key: customer.id, value: customer.id, text: customer.name } })
        const productOptions = products.map((product) => { return { key: product.id, value: product.id, text: product.name } })
        const storeOptions = stores.map((store) => { return { key: store.id, value: store.id, text: store.name } })

        const inlineStyle = {
            modal: {
                marginTop: 'auto !important',
                position: 'relative',
                overflow: 'visible'
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
                    </Button>}
            >
                <Modal.Header>Edit Sale</Modal.Header>
                <Modal.Content >
                    <DateInput
                        name='date'
                        value={sale.dateSold}
                        onChange={this.setDate}
                    />
                    <br />
                    <Dropdown
                        selection
                        placeholder={sale.customerName}
                        options={customerOptions}
                        onChange={this.handleCustomerDDChange} />
                    <br />
                    <Dropdown
                        selection
                        placeholder={sale.productName}
                        options={productOptions}
                        onChange={this.handleProductDDChange} />
                    <br />
                    <Dropdown
                        selection
                        placeholder={sale.storeName}
                        options={storeOptions}
                        onChange={this.handleStoreDDChange} />
                    <Divider />
                    <Button onClick={this.closeModal}>Cancel</Button>
                    <Button onClick={(evt) => this.handleEditButton()} color='green'>
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
