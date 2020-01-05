import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { CreateEntityModal } from './Modals/CreateEntityModal';
import { EditEntityModal } from './Modals/EditEntityModal';
import { DeleteEntityModal } from './Modals/DeleteEntityModal';

export class ProductView extends Component {
    displayName = ProductView.name

    constructor(props) {
        super(props);

        this.state = { products: [] };
    }

    componentDidMount() {
        fetch('api/Product/GetAllProducts')
            .then(response => response.json())
            .then(data => this.setState({ products: data }));
    }

    refresh = () => {
        this.componentDidMount();
    }

    renderProductsTable() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.products.map(product =>
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>
                                    <EditEntityModal
                                        entityName="Product"
                                        entity={product}
                                        field1="Name"
                                        field2="Price"
                                        value1={product.name}
                                        value2={product.price}
                                        refresh={this.refresh}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteEntityModal
                                        entityName="Product"
                                        entityId={product.id}
                                        refresh={this.refresh}
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
        let contents = this.renderProductsTable();

        return (
            <div>
                <h1>Products</h1>
                <CreateEntityModal refresh={this.refresh} entityName="Product" field1="Name" field2="Price" />
                {contents}
            </div>
        );
    }
}