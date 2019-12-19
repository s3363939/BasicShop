import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';

export class FixedMenuLayout extends Component {

    render() {
        return (
            <Grid>
                <Row>
                    <Menu fixed='top' inverted>
                        <Container>
                            <Menu.Item>SHOP</Menu.Item>
                            <Menu.Item as={Link} to='/CustomerView'>Customers</Menu.Item>
                            <Menu.Item as={Link} to='/ProductView'>Products</Menu.Item>
                            <Menu.Item as={Link} to='/StoreView'>Stores</Menu.Item>
                            <Menu.Item as={Link} to='/SaleView'>Sales</Menu.Item>
                        </Container>
                    </Menu>
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </Grid>
        );
    }
}