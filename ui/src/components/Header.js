import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import { getCategories } from '../actions/categories'
import { bindActionCreators } from 'redux'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
    }

    componentWillMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Udacity's React Nanodegree"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={() => this.setState({open: !this.state.open}) }
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
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
                </Drawer>
            </div>
        )
    }
}

const mapStatetoProps = ({ categories }) => {
    return {
        categories: categories || [],
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ getCategories }, dispatch)

export default connect(mapStatetoProps, mapDispatchToProps)(Header);