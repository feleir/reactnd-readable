import _ from 'lodash'
import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    createPost, 
    getPost, 
    updatePost 
} from '../actions/posts'
import { getCategories } from '../actions/categories'
import { capitalize, renderField } from '../utils/helpers'

const buttonStyle = {
    margin: 12,
}

class PostEdit extends Component {
    constructor(props) {
        super(props)
        this.initialized = false;
    }

    componentWillMount() {
        if (this.props.postId) {
            this.props.getPost(this.props.postId)
        }
        this.props.getCategories();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.post && !this.initialized) {
            this.initialized = true;
            this.props.initialize(newProps.post)
        }
    }
    
    renderCategoryFields(field) {
        const { categories } = this.props;
        const { meta: { error } } = field;

        return (
            <SelectField
                floatingLabelText={field.label}
                {...field.input}
                onChange={(event, index, value) => field.input.onChange(value)}
                errorText={error}
                fullWidth={true}
            >
                {_.map(categories, category => (
                    <MenuItem 
                        key={category.name}
                        value={category.name} 
                        primaryText={capitalize(category.name)} />
                ))}
            </SelectField>
        );
    }
    
    onSubmit(values) {
        if (this.props.post) {
            this.props.updatePost(this.props.post.id, values)
                .then(() => this.props.history.goBack())
        } else {
            this.props.createPost(values)
                .then(() => this.props.history.goBack())
        }
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title:"
                    name="title"
                    component={renderField}
                />
                <Field
                    label="Content:"
                    name="body"
                    multiLine={true}
                    rows={4}
                    component={renderField}
                />
                {
                    !this.props.post && 
                    (<Field
                        label="Author:"
                        name="author"
                        component={renderField}
                    />)
                }
                {
                    !this.props.post && 
                    (<Field
                        name="category"
                        label="Category:"
                        component={field => this.renderCategoryFields(field)} 
                        />)
                }
                <div className="form-buttons">
                    <RaisedButton type="submit" style={buttonStyle}>Submit</RaisedButton>
                    <RaisedButton href="/" style={buttonStyle}>Cancel</RaisedButton>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Title is required."
    }
    
    if (!values.author) {
        errors.author = "Author is required."
    }
    
    if (!values.body) {
        errors.body = "Content is required."
    }
    
    if (!values.category) {
        errors.category = "Category is required."
    }
    
    return errors;
}

function mapStateToProps({ posts, categories }, ownProps) {
    return { 
        categories: categories,
        post: posts[ownProps.postId]
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getPost, updatePost, createPost, getCategories }, dispatch)
/* {
    return {
        getPost: (postId) => getPost(postId)(dispatch),
        updatePost: (postId, values) => updatePost(postId, values)(dispatch),
        createPost: (values) => createPost(values)(dispatch),
        getCategories: () => getCategories(dispatch)
    }
} */

export default reduxForm({
    validate,
    form: 'CreatePostForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(PostEdit)
)