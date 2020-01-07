import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { CreateSaleModal } from './Modals/CreateSaleModal';
import { EditSaleModal } from './Modals/EditSaleModal';
import { DeleteSaleModal } from './Modals/DeleteSaleModal';
import Moment from 'moment';


export class SaleView extends Component {
    displayName = SaleView.name

    constructor(props) {
        super(props);

        this.state = {
            sales: []
        };
    }

    componentDidMount() {
        fetch('api/Sale/GetAllSales')
            .then(response => response.json())
            .then(data => this.setState({ sales: data }));
    }

    refresh = () => {
        this.componentDidMount();
    }

    formatDate = (date) => {
        return Moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }

    renderSalesTable() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.sales.map(sale =>
                            <Table.Row key={sale.id}>
                                <Table.Cell>{sale.customerName}</Table.Cell>
                                <Table.Cell>{sale.productName}</Table.Cell>
                                <Table.Cell>{sale.storeName}</Table.Cell>
                                <Table.Cell>{this.formatDate(sale.dateSold)}</Table.Cell>
                                <Table.Cell>
                                    <EditSaleModal
                                        entity={sale}
                                        customerName={sale.customerName}
                                        productName={sale.productName}
                                        storeName={sale.storeName}
                                        refresh={this.refresh}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteSaleModal
                                        entity={sale}
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
        let contents = this.renderSalesTable();
        return (
            <div>
                <h1>Sales</h1>
                <CreateSaleModal refresh={this.refresh} />
                {contents}
            </div>
        );
    }
}
