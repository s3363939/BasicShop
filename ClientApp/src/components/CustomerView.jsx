import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { CreateEntityModal } from './Modals/CreateEntityModal';
import { EditEntityModal } from './Modals/EditEntityModal';
import { DeleteEntityModal } from './Modals/DeleteEntityModal';

export class CustomerView extends Component {
    displayName = CustomerView.name

    constructor(props) {
        super(props);

        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        fetch('api/Customer/GetAllCustomers')
            .then(response => response.json())
            .then(data => this.setState({ customers: data }));
    }

    refresh = () => {
        this.componentDidMount();
    }

    static renderCustomersTable(customers) {
        return (
            <div>
                <h1>Customers</h1>
                <div>
                    
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {customers.map(customer =>
                                <Table.Row key={customer.Id}>
                                    <Table.Cell>{customer.name}</Table.Cell>
                                    <Table.Cell>{customer.address}</Table.Cell>
                                    <Table.Cell>
                                        <EditEntityModal
                                            entityName="Customer"
                                            entity={customer}
                                            field1="Name"
                                            field2="Address"
                                            value1={customer.name}
                                            value2={customer.address}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteEntityModal
                                            entityName="Customer"
                                            entityId={customer.id}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div >
            </div>
        );
    }

    render() {
        let contents = CustomerView.renderCustomersTable(this.state.customers);

        return (
            <div>
                <h1>Customer</h1>
                <CreateEntityModal refresh={this.refresh} entityName="Customer" field1="Name" field2="Address" />
                {contents}
            </div>
        );
    }
}
