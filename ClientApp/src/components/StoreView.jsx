import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { CreateEntityModal } from './Modals/CreateEntityModal';
import { EditEntityModal } from './Modals/EditEntityModal';
import { DeleteEntityModal } from './Modals/DeleteEntityModal';

export class StoreView extends Component {
    displayName = StoreView.name

    constructor(props) {
        super(props);

        this.state = { stores: [] };
    }

    componentDidMount() {
        fetch('api/Store/GetAllStores')
            .then(response => response.json())
            .then(data => this.setState({ stores: data }));
    }

    refresh = () => {
        this.componentDidMount();
    }

    static renderStoresTable(stores) {
        return (
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
                        {stores.map(store =>
                            <Table.Row key={store.id}>
                                <Table.Cell>{store.name}</Table.Cell>
                                <Table.Cell>{store.address}</Table.Cell>
                                <Table.Cell>
                                    <EditEntityModal
                                        entityName="Store"
                                        field1="Name"
                                        field2="Address" 
                                        entity={store}
                                        value1={store.name}
                                        value2={store.address}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteEntityModal
                                        entityName="Store"
                                        entityId={store.id}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div >
        );
    }

    render() {
        let contents = StoreView.renderStoresTable(this.state.stores);

        return (
            <div>
                <h1>Stores</h1>
                <CreateEntityModal refresh={this.refresh} entityName="Store" field1="Name" field2="Address" />
                {contents}
            </div>
        );
    }
}