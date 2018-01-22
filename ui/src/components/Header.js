import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import { getCategories } from '../actions/categories'

class Header extends Component {
    componentWillMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Udacity's React Nanodegree</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
                            <MenuItem 
                                href='/'
                            >
                                All
                            </MenuItem>
                            {this.props.categories.map(category => (
                                <MenuItem 
                                    key={category.name} 
                                    href={`/${category.path}`}
                                >
                                    {capitalize(category.name)}
                                </MenuItem>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="https://github.com/feleir/reactnd-readable">
                            Github repository
                        </NavItem>
                        <NavItem eventKey={2} href="www.linkedin.com/in/ivan-diaz-fernandez">
                            By Ivan Diaz
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStatetoProps = ({ categories }) => {
    return {
        categories: categories || [],
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => getCategories(dispatch)
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Header);