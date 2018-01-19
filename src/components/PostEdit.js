import _ from 'lodash'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { 
    createPost, 
    getPost, 
    updatePost 
} from '../actions/posts'
import { getCategories } from '../actions/categories'
import { capitalize } from '../utils/helpers'


class PostsNew extends Component {
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
    
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
        return (
            <FormGroup validationState={className}>
                <label>{field.label}</label>
                <FormControl
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }
    
    renderCategoryFields(field) {
        const { categories } = this.props;
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        return (
            <FormGroup validationState={className}>
                <label>{field.label}</label>
                <select {...field.input} className="form-control">
                    <option value="" className="disabled">-- Select content</option>
                    {_.map(categories, category => (
                        <option
                            key={category.name}
                            value={category.name}
                        >
                            {capitalize(category.name)}
                        </option>
                    ))}
                </select>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </FormGroup>
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
            <div className="container">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title:"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Content:"
                    name="body"
                    component={this.renderField}
                />
                {
                    !this.props.post && 
                    (<Field
                        label="Author:"
                        name="author"
                        component={this.renderField}
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
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Enter a title!"
    }
    
    if (!values.author) {
        errors.author = "Enter a name!"
    }
    
    if (!values.body) {
        errors.body = "Enter some content!"
    }
    
    if (!values.category) {
        errors.category = "Select some content!"
    }
    
    return errors;
}

function mapStateToProps({ posts, categories }, ownProps) {
    return { 
        categories: categories,
        post: posts[ownProps.postId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (postId) => getPost(postId)(dispatch),
        updatePost: (postId, values) => updatePost(postId, values)(dispatch),
        createPost: (values) => createPost(values)(dispatch),
        getCategories: () => getCategories(dispatch)
    }
}

export default reduxForm({
    validate,
    form: 'CreatePostForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(PostsNew)
)