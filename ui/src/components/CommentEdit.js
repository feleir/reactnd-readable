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
    createComment, 
    getComment, 
    updateComment 
} from '../actions/comments'


class CommentEdit extends Component {
    constructor(props) {
        super(props)
        this.initialized = false;
    }

    componentWillMount() {
        if (this.props.commentId) {
            this.props.getComment(this.props.commentId)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.comment && !this.initialized) {
            this.initialized = true;
            this.props.initialize(newProps.comment)
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
    
    onSubmit(values) {
        if (this.props.comment) {
            this.props.updateComment(this.props.comment.id, values)
                .then(() => this.props.history.goBack())
        } else {
            const data = {
                ...values,
                parentId: this.props.parentId
            }

            this.props.createComment(data)
                .then(() => this.props.history.goBack())
        }
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Content:"
                    name="body"
                    component={this.renderField}
                />
                {
                    !this.props.comment && 
                    (<Field
                        label="Author:"
                        name="author"
                        component={this.renderField}
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
    
    if (!values.author) {
        errors.author = "Enter a name!"
    }
    
    if (!values.body) {
        errors.body = "Enter some content!"
    }
    
    return errors;
}

function mapStateToProps({ comments }, ownProps) {
    return { 
        comment: comments[ownProps.commentId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComment: (commentId) => getComment(commentId)(dispatch),
        updateComment: (commentId, values) => updateComment(commentId, values)(dispatch),
        createComment: (values) => createComment(values)(dispatch)
    }
}

export default reduxForm({
    validate,
    form: 'CreateCommentForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(CommentEdit)
)