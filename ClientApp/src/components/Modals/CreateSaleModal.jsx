import React, { Component } from 'react';
import { Icon, Button, Modal, Dropdown, Divider } from 'semantic-ui-react';
import $ from 'jquery';
import { DateInput } from 'semantic-ui-calendar-react';

export class CreateSaleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            customers: [],
            products: [],
            stores: [],
            dateSold: '',
            productId: '',
            customerId: '',
            storeId: ''
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

    CreateSale() {

        const mySale = {
            DateSold: this.state.dateSold,
            ProductId: this.state.productId,
            CustomerId: this.state.customerId,
            StoreId: this.state.storeId
        };
        console.log('new sale: ', mySale);

        var self = this;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: mySale,
            url: 'api/Sale/AddSale',
            success: function () {
                self.props.refresh();
            }
        });
        
        this.setState({ DateSold: '', productId: '', customerId: '', storeId: '' })
    }

    handleCreateButton = () => {
        this.CreateSale();
        this.closeModal();
    }

    handleCustomerDDChange = (e, data) => {
        this.setState({ customerId: data.value });
    }

    handleProductDDChange = (e, data) =>  {
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
            dateSold
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
                        color='blue'>
                        New Sale
                    </Button>} >
                <Modal.Header>New Sale</Modal.Header>
                <Modal.Content >                    
                    <DateInput
                        name='date'
                        value={dateSold}
                        onChange={this.setDate} /> 
                    <br />
                    <Dropdown
                        selection
                        placeholder='customer'
                        options={customerOptions}
                        onChange={this.handleCustomerDDChange} />                      
                    <br />
                    <Dropdown
                        selection
                        placeholder='product'
                        options={productOptions}
                        onChange={this.handleProductDDChange} />
                    <br />
                    <Dropdown
                        selection
                        placeholder='store'
                        options={storeOptions}
                        onChange={this.handleStoreDDChange} />
                    <Divider/>
                    <Button onClick={this.closeModal}>Cancel</Button>
                    <Button onClick={this.handleCreateButton} color='green'>
                        <Button.Content visible>
                            Create
                            <Icon name='check' />
                        </Button.Content>
                    </Button>                                          
                </Modal.Content>
            </Modal>
        );
    }
}
